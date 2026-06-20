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

export type OcrSearchResult = {
  brands: string[];
  matches: GidaRadariMatch[];
  isClean: boolean;
};

type IndexedRecord = {
  record: GidaRadariRecord;
  companyNorm: string;
  productNorm: string;
  combinedNorm: string;
};

const DATA_URL = "/data/records.json";

let cachedRecords: GidaRadariRecord[] | null = null;
let indexedRecords: IndexedRecord[] | null = null;

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
  "devlet",
  "pancar",
  "seker",
  "tarim",
  "sozlesmel",
  "sozlesmeli",
  "kristal",
  "uretilmistir",
  "kurulusudur",
]);

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

function scoreIndexedRecordFast(query: string, indexed: IndexedRecord): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery || normalizedQuery.length < 3) return 0;

  const fields = [
    { value: indexed.companyNorm, weight: 1.2 },
    { value: indexed.productNorm, weight: 1 },
    { value: indexed.combinedNorm, weight: 1.05 },
  ];

  let bestScore = 0;

  for (const field of fields) {
    if (!field.value) continue;

    if (field.value === normalizedQuery) {
      bestScore = Math.max(bestScore, 100 * field.weight);
      continue;
    }

    if (field.value.startsWith(normalizedQuery)) {
      bestScore = Math.max(bestScore, 92 * field.weight);
    }

    if (field.value.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 78 * field.weight);
    }

    if (normalizedQuery.length >= 5) {
      const queryTokens = normalizedQuery.split(" ").filter(Boolean);
      const targetTokens = field.value.split(" ").filter(Boolean);
      const overlap = queryTokens.filter((token) =>
        targetTokens.some(
          (targetToken) =>
            targetToken.includes(token) || token.includes(targetToken),
        ),
      ).length;

      if (overlap === queryTokens.length && queryTokens.length > 0) {
        bestScore = Math.max(bestScore, 70 * field.weight);
      }
    }
  }

  return Math.round(bestScore);
}

function buildIndexedRecords(records: GidaRadariRecord[]): IndexedRecord[] {
  return records.map((record) => ({
    record,
    companyNorm: normalize(record.company),
    productNorm: normalize(record.product),
    combinedNorm: normalize(`${record.company} ${record.product}`),
  }));
}

function getIndexedRecords(records: GidaRadariRecord[]): IndexedRecord[] {
  if (!indexedRecords || indexedRecords.length !== records.length) {
    indexedRecords = buildIndexedRecords(records);
  }
  return indexedRecords;
}

function isUsefulOcrToken(token: string): boolean {
  if (token.length < 4) return false;
  if (OCR_STOP_WORDS.has(token)) return false;
  if (/^\d+$/.test(token)) return false;
  return true;
}

function extractBrandCandidates(ocrText: string): string[] {
  const candidates: string[] = [];
  const seen = new Set<string>();

  const addCandidate = (value: string) => {
    const cleaned = value.replace(/["']/g, " ").replace(/\s+/g, " ").trim();
    const key = normalize(cleaned);
    if (cleaned.length < 3 || seen.has(key)) return;
    seen.add(key);
    candidates.push(cleaned);
  };

  const lines = ocrText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 5)) {
    if (line.length <= 45 && !/^\d/.test(line)) {
      addCandidate(line);
    }

    for (const part of line.split("/").map((item) => item.trim())) {
      if (part.length >= 4 && part.length <= 40) {
        addCandidate(part);
      }
    }
  }

  const meaningfulLines = lines.filter((line) => line.length >= 4 && line.length <= 24);
  if (meaningfulLines.length >= 2) {
    addCandidate(meaningfulLines.slice(0, 2).join(" "));
  }

  for (const word of normalize(ocrText).split(" ").filter(isUsefulOcrToken)) {
    addCandidate(word);
  }

  return candidates.slice(0, 8);
}

export async function loadGidaRadariRecords(): Promise<GidaRadariRecord[]> {
  if (cachedRecords) return cachedRecords;

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("GıdaRadarı verileri yüklenemedi.");
  }

  const data = (await response.json()) as GidaRadariRecord[];
  cachedRecords = data;
  indexedRecords = null;
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

export function searchGidaRadariFromOcrText(
  ocrText: string,
  records: GidaRadariRecord[],
  limit = 8,
): OcrSearchResult {
  const indexed = getIndexedRecords(records);
  const candidates = extractBrandCandidates(ocrText);
  const brands = candidates.slice(0, 3);
  const primaryBrand = brands[0] ?? "";
  const brandNorm = normalize(primaryBrand);

  if (brandNorm.length >= 4) {
    const brandPool = indexed.filter(
      (item) =>
        item.companyNorm.includes(brandNorm) ||
        item.productNorm.includes(brandNorm) ||
        item.combinedNorm.includes(brandNorm),
    );

    if (brandPool.length === 0) {
      return {
        brands,
        matches: [],
        isClean: true,
      };
    }

    const bestMatches = new Map<string, GidaRadariMatch>();

    for (const candidate of candidates) {
      for (const item of brandPool) {
        const score = scoreIndexedRecordFast(candidate, item);
        if (score < 60) continue;

        const existing = bestMatches.get(item.record.id);
        if (!existing || score > existing.score) {
          bestMatches.set(item.record.id, { record: item.record, score });
        }
      }
    }

    return {
      brands,
      matches: [...bestMatches.values()]
        .sort((a, b) => b.score - a.score)
        .slice(0, limit),
      isClean: false,
    };
  }

  const bestMatches = new Map<string, GidaRadariMatch>();

  for (const candidate of candidates) {
    const normalizedCandidate = normalize(candidate);
    if (normalizedCandidate.length < 4) continue;

    for (const item of indexed) {
      const score = scoreIndexedRecordFast(candidate, item);
      if (score < 70) continue;

      const existing = bestMatches.get(item.record.id);
      if (!existing || score > existing.score) {
        bestMatches.set(item.record.id, { record: item.record, score });
      }
    }
  }

  return {
    brands,
    matches: [...bestMatches.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit),
    isClean: false,
  };
}