export type GidaRadariRecord = {
  id: string;
  name: string;
  brand: string;
  category: string;
  barcode?: string;
  year: number;
  issue: string;
  source: string;
};

export type GidaRadariMatch = {
  record: GidaRadariRecord;
  score: number;
};

const DATA_URL = "/data/products.json";

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
  const queryTokens = query.split(" ").filter(Boolean);
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
    { value: record.name, weight: 1 },
    { value: record.brand, weight: 0.95 },
    { value: record.category, weight: 0.75 },
    { value: record.barcode ?? "", weight: 1.1 },
    { value: `${record.brand} ${record.name}`, weight: 1.05 },
    { value: record.issue, weight: 0.35 },
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
  limit = 5,
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

export function hasFraudRecord(issue: string): boolean {
  return !normalize(issue).includes("kayit bulunamadi");
}
