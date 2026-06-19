function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Görsel okunamadı."));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Görsel dönüştürülemedi."));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Görsel okunamadı."));
    reader.readAsDataURL(file);
  });
}

export async function extractTextFromImage(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_GOOGLE_VISION_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Vision API anahtarı tanımlı değil. Vercel veya .env dosyasında VITE_GOOGLE_VISION_API_KEY ayarlayın.",
    );
  }

  const base64 = await fileToBase64(file);

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64 },
            features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? "Cloud Vision API isteği başarısız.");
  }

  const annotation = data.responses?.[0];
  if (annotation?.error) {
    throw new Error(annotation.error.message);
  }

  const text =
    annotation?.fullTextAnnotation?.text ??
    annotation?.textAnnotations?.[0]?.description ??
    "";

  if (!text.trim()) {
    throw new Error("Görselde okunabilir yazı bulunamadı. Daha net bir fotoğraf deneyin.");
  }

  return text.trim();
}
