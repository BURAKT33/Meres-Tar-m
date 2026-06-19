export type GidaRadariRecord = {
  id: string;
  sourceFile: string;
  sourceLabel: string;
  announcementDate: string;
  company: string;
  product: string;
  issue: string;
  batch: string;
  location: string;
  productGroup: string;
};

export type GidaRadariMatch = {
  record: GidaRadariRecord;
  score: number;
};

const DATA_URL = "/data/records.json";

let cachedRecords: GidaRadariRecord[] | null = null;

function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[b.length][a.length];
}

function similarityScore(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 100;
  if (a.includes(b) || b.includes(a)) return 85;

  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.max(0, Math.round((1 - distance / maxLen) * 100));
}

function tokenOverlapScore(query: string, target: string): number {
  const queryTokens = query.split(" ").filter((token) => token.length >= 2);
  const targetTokens = new Set(target.split(" ").filter(Boolean));
  if (!queryTokens.length) return 0;

  const matches = queryTokens.filter((token) =>
    [...targetTokens].some(
      (targetToken) =>
        targetToken.includes(token) || token.includes(targetToken),
    ),
  );

  return Math.round((matches.length / queryTokens.length) * 70);
}

function scoreRecord(query: string, record: GidaRadariRecord): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const fields = [
    { value: record.company, weight: 1.2 },
    { value: record.product, weight: 1 },
    { value: `${record.company} ${record.product}`, weight: 1.05 },
    { value: record.productGroup, weight: 0.85 },
    { value: record.issue, weight: 0.55 },
    { value: record.location, weight: 0.45 },
    { value: record.batch, weight: 0.4 },
    { value: record.sourceLabel, weight: 0.25 },
  ];

  let bestScore = 0;

  for (const field of fields) {
    const normalizedField = normalize(field.value);
    if (!normalizedField) continue;

    if (normalizedField === normalizedQuery) {
      bestScore = Math.max(bestScore, 100 * field.weight);
      continue;
    }

    if (normalizedField.startsWith(normalizedQuery)) {
      bestScore = Math.max(bestScore, 90 * field.weight);
    }

    if (normalizedField.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 75 * field.weight);
    }

    bestScore = Math.max(
      bestScore,
      similarityScore(normalizedQuery, normalizedField) * field.weight,
    );
    bestScore = Math.max(
      bestScore,
      tokenOverlapScore(normalizedQuery, normalizedField) * field.weight,
    );
  }

  return Math.round(bestScore);
}

export async function loadGidaRadariRecords(): Promise<GidaRadariRecord[]> {
  if (cachedRecords) return cachedRecords;

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("GıdaRadarı verileri yüklenemedi.");
  }

  const data = (await response.json()) as GidaRadariRecord[];
  cachedRecords = data;
  return data;
}

export function searchGidaRadariRecords(
  query: string,
  records: GidaRadariRecord[],
  limit = 8,
): GidaRadariMatch[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  return records
    .map((record) => ({
      record,
      score: scoreRecord(trimmedQuery, record),
    }))
    .filter((match) => match.score >= 35)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

const OCR_STOP_WORDS = new Set([
  "sut",
  "gida",
  "urun",
  "urunleri",
  "urunler",
  "marka",
  "tic",
  "san",
  "ltd",
  "sti",
  "anonim",
  "sirketi",
  "ve",
  "icin",
  "ile",
  "gr",
  "gram",
  "ml",
  "kg",
  "adet",
  "tam",
  "yagli",
  "yag",
  "taze",
  "islem",
  "gormus",
  "isil",
  "net",
  "icerik",
  "miktari",
  "skt",
  "tet",
  "tett",
  "parti",
  "seri",
  "no",
  "the",
  "and",
]);

function isUsefulOcrToken(token: string): boolean {
  if (token.length < 3) return false;
  if (OCR_STOP_WORDS.has(token)) return false;
  if (/^\d+$/.test(token)) return false;
  return true;
}

function extractOcrSearchCandidates(ocrText: string): string[] {
  const candidates = new Set<string>();
  const trimmed = ocrText.trim();

  if (trimmed.length >= 3) {
    candidates.add(trimmed);
  }

  for (const line of ocrText.split("\n")) {
    const cleanLine = line.replace(/\s+/g, " ").trim();
    if (cleanLine.length >= 3) {
      candidates.add(cleanLine);
    }

    const slashParts = cleanLine.split("/").map((part) => part.trim());
    for (const part of slashParts) {
      if (part.length >= 3) {
        candidates.add(part);
      }
    }
  }

  const words = normalize(ocrText)
    .split(" ")
    .filter(isUsefulOcrToken);

  for (const word of words) {
    candidates.add(word);
  }

  for (let index = 0; index < words.length; index++) {
    for (let length = 2; length <= 4 && index + length <= words.length; length++) {
      const phrase = words.slice(index, index + length).join(" ");
      if (phrase.length >= 5) {
        candidates.add(phrase);
      }
    }
  }

  return [...candidates];
}

export function searchGidaRadariFromOcrText(
  ocrText: string,
  records: GidaRadariRecord[],
  limit = 8,
): GidaRadariMatch[] {
  const candidates = extractOcrSearchCandidates(ocrText);
  const bestMatches = new Map<string, GidaRadariMatch>();

  for (const candidate of candidates) {
    for (const record of records) {
      const score = scoreRecord(candidate, record);
      if (score < 30) continue;

      const existing = bestMatches.get(record.id);
      if (!existing || score > existing.score) {
        bestMatches.set(record.id, { record, score });
      }
    }
  }

  return [...bestMatches.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
