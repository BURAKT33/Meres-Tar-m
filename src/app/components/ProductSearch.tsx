import { motion } from "motion/react";
import {
  Search,
  AlertTriangle,
  Radar,
  Loader2,
  Building2,
  Camera,
  Type,
  CheckCircle2,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { extractTextFromImage } from "@/lib/googleVision";
import { yieldToMain } from "@/lib/asyncUtils";
import {
  GidaRadariMatch,
  loadGidaRadariRecords,
  searchGidaRadariFromOcrText,
  searchGidaRadariRecords,
} from "@/lib/gidaradariSearch";

type SearchMode = "text" | "camera";
type SearchStep = "idle" | "processing" | "reading" | "searching";

function SearchResultCard({ record, score }: GidaRadariMatch) {
  return (
    <div
      className="rounded-3xl p-6 shadow-lg"
      style={{
        backgroundColor: "rgba(255, 140, 66, 0.1)",
        border: "2px solid var(--accent-warning)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--accent-warning)" }}
        >
          <AlertTriangle size={24} color="#ffffff" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--text-dark)",
              }}
            >
              {record.company}
            </h4>
            <span
              className="px-2 py-1 rounded-full text-xs"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                color: "var(--text-gray)",
                fontFamily: "var(--font-body)",
              }}
            >
              %{score} eşleşme
            </span>
          </div>

          <p
            className="mb-2 flex items-start gap-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--text-gray)",
            }}
          >
            <Building2 size={14} className="mt-1 flex-shrink-0" />
            <span>Ürün: {record.product}</span>
          </p>

          <p
            className="mb-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--text-gray)",
            }}
          >
            Uygunsuzluk: {record.issue}
          </p>

          <p
            className="mb-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--text-gray)",
            }}
          >
            {record.productGroup}
            {record.location ? ` · ${record.location}` : ""}
            {record.announcementDate ? ` · ${record.announcementDate}` : ""}
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--text-dark)",
              lineHeight: 1.6,
            }}
          >
            Kaynak: {record.sourceLabel}
            <br />
            (T.C. Tarım ve Orman Bakanlığı resmi kayıtları)
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductSearch() {
  const [mode, setMode] = useState<SearchMode>("text");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GidaRadariMatch[]>([]);
  const [detectedText, setDetectedText] = useState("");
  const [detectedBrands, setDetectedBrands] = useState<string[]>([]);
  const [isCleanResult, setIsCleanResult] = useState(false);
  const [searchStep, setSearchStep] = useState<SearchStep>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

  useEffect(() => {
    loadGidaRadariRecords()
      .catch(() => {
        // Ön yükleme başarısız olursa arama sırasında tekrar denenecek.
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const resetResults = () => {
    setResults([]);
    setDetectedText("");
    setDetectedBrands([]);
    setIsCleanResult(false);
    setSearchStep("idle");
    setHasSearched(false);
    setError(null);
  };

  const handleModeChange = (nextMode: SearchMode) => {
    setMode(nextMode);
    resetResults();
  };

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      resetResults();
      return;
    }

    setIsSearching(true);
    setError(null);
    setDetectedText("");

    try {
      const records = await loadGidaRadariRecords();
      const matches = searchGidaRadariRecords(trimmedQuery, records, 8);
      setResults(matches);
      setHasSearched(true);
    } catch (searchError) {
      const message =
        searchError instanceof Error
          ? searchError.message
          : "Arama sırasında bir hata oluştu.";
      setError(message);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    selectedFileRef.current = file;
    resetResults();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCameraSearch = async () => {
    const file = selectedFileRef.current;
    if (!file) {
      setError("Lütfen önce ürün fotoğrafı çekin veya yükleyin.");
      return;
    }

    setIsSearching(true);
    setSearchStep("processing");
    setError(null);
    setDetectedText("");
    setDetectedBrands([]);
    setIsCleanResult(false);
    setResults([]);
    setHasSearched(false);

    try {
      await yieldToMain();
      setSearchStep("reading");
      const ocrText = await extractTextFromImage(file);

      setSearchStep("searching");
      await yieldToMain();

      const records = await loadGidaRadariRecords();
      const searchResult = searchGidaRadariFromOcrText(ocrText, records, 8);

      setDetectedText(ocrText);
      setDetectedBrands(searchResult.brands);
      setIsCleanResult(searchResult.isClean);
      setResults(searchResult.matches);
      setHasSearched(true);
    } catch (searchError) {
      const message =
        searchError instanceof Error
          ? searchError.message
          : "Görsel analizi sırasında bir hata oluştu.";
      setError(message);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
      setSearchStep("idle");
    }
  };

  const searchStepLabel =
    searchStep === "processing"
      ? "Fotoğraf işleniyor..."
      : searchStep === "reading"
        ? "Etiket okunuyor..."
        : searchStep === "searching"
          ? "Kayıtlar aranıyor..."
          : "Analiz ediliyor";

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--background-cream)" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              backgroundColor: "rgba(255, 140, 66, 0.12)",
              border: "1px solid var(--accent-warning)",
            }}
          >
            <Radar size={18} style={{ color: "var(--accent-warning)" }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--accent-warning)",
              }}
            >
              GıdaRadarı
            </span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: "var(--text-dark)",
            }}
          >
            Bakanlık kayıtlarında sorgula
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              color: "var(--text-gray)",
              maxWidth: "36rem",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Yazarak veya kamera ile firma, ürün ya da marka arayın. Veriler T.C. Tarım ve
            Orman Bakanlığı&apos;nın yayımladığı kayıtlardan alınır.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => handleModeChange("text")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
            style={{
              backgroundColor: mode === "text" ? "var(--accent-warning)" : "#ffffff",
              color: mode === "text" ? "#ffffff" : "var(--text-dark)",
              border: "2px solid var(--border-light)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            <Type size={18} />
            Yazı ile ara
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("camera")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
            style={{
              backgroundColor: mode === "camera" ? "var(--accent-warning)" : "#ffffff",
              color: mode === "camera" ? "#ffffff" : "var(--text-dark)",
              border: "2px solid var(--border-light)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            <Camera size={18} />
            Kamera ile ara
          </button>
        </div>

        {mode === "text" ? (
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div
              className="flex flex-col sm:flex-row gap-4 p-3 rounded-full shadow-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid var(--border-light)",
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={24} style={{ color: "var(--text-gray)" }} />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Firma, ürün veya marka adı gir (örnek: Yöre Bal, peynir, sucuk)"
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--text-dark)",
                  }}
                  disabled={isLoadingData}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoadingData || isSearching || !query.trim()}
                className="px-8 py-3 rounded-full transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--accent-warning)",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                }}
              >
                {isSearching ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Aranıyor
                  </>
                ) : (
                  "Sorgula"
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <div className="mb-8 space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageSelect}
            />

            <div
              className="rounded-3xl p-6 shadow-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid var(--border-light)",
              }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Seçilen ürün fotoğrafı"
                  className="w-full max-h-80 object-contain rounded-2xl mb-4"
                />
              ) : (
                <div
                  className="rounded-2xl border-2 border-dashed p-10 text-center mb-4"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  <Camera size={40} className="mx-auto mb-3" style={{ color: "var(--text-gray)" }} />
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--text-gray)" }}>
                    Ürün etiketinin fotoğrafını çekin veya galeriden seçin
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoadingData || isSearching}
                  className="flex-1 px-6 py-3 rounded-full"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid var(--border-light)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                  }}
                >
                  Fotoğraf Çek / Seç
                </button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCameraSearch}
                  disabled={isLoadingData || isSearching || !previewUrl}
                  className="flex-1 px-6 py-3 rounded-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--accent-warning)",
                    color: "#ffffff",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {searchStepLabel}
                    </>
                  ) : (
                    "Etiketi Oku ve Ara"
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div
            className="rounded-2xl p-4 mb-6 text-center"
            style={{
              backgroundColor: "rgba(255, 140, 66, 0.08)",
              border: "1px solid var(--accent-warning)",
              fontFamily: "var(--font-body)",
              color: "var(--text-dark)",
            }}
          >
            {error}
          </div>
        )}

        {detectedText && (
          <div
            className="rounded-2xl p-4 mb-6"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--border-light)",
              fontFamily: "var(--font-body)",
              color: "var(--text-gray)",
            }}
          >
            {detectedBrands.length > 0 && (
              <p className="mb-2">
                <strong style={{ color: "var(--text-dark)" }}>Algılanan marka:</strong>{" "}
                {detectedBrands.join(" · ")}
              </p>
            )}
            <strong style={{ color: "var(--text-dark)" }}>Okunan yazılar:</strong>
            <p className="mt-2 whitespace-pre-wrap text-sm">{detectedText}</p>
          </div>
        )}

        {hasSearched && !error && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            {isCleanResult ? (
              <div
                className="rounded-3xl p-6 shadow-lg"
                style={{
                  backgroundColor: "rgba(45, 106, 79, 0.08)",
                  border: "2px solid var(--primary-green-light)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-green-dark)" }}
                  >
                    <CheckCircle2 size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h4
                      className="mb-2"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "var(--text-dark)",
                      }}
                    >
                      Kayıt bulunamadı
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        color: "var(--text-gray)",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong>{detectedBrands[0] ?? "Bu marka"}</strong> için Bakanlık
                      kayıtlarında uygunsuzluk tespiti bulunamadı.
                    </p>
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--text-gray)",
                  }}
                >
                  <strong style={{ color: "var(--text-dark)" }}>{results.length}</strong> eşleşen
                  firma / marka listelendi
                </p>

                {results.map((match, index) => (
                  <motion.div
                    key={match.record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <SearchResultCard {...match} />
                  </motion.div>
                ))}
              </>
            ) : (
              <div
                className="rounded-3xl p-6 text-center shadow-lg"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid var(--border-light)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--text-gray)",
                  }}
                >
                  {mode === "camera"
                    ? "Fotoğraftaki yazılara yakın bir firma veya marka kaydı bulunamadı."
                    : "Aramanıza yakın bir firma veya ürün kaydı bulunamadı."}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {!hasSearched && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--text-gray)",
            }}
          >
            {isLoadingData
              ? "Kayıtlar yükleniyor..."
              : mode === "camera"
                ? "Ürün etiketini net çekin; yazılar okunup Bakanlık kayıtlarında aranır."
                : "Firma, ürün veya marka adı ile Bakanlık kayıtlarında arama yapabilirsiniz."}
          </motion.p>
        )}
      </div>
    </section>
  );
}
