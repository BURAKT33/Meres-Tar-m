import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const outputPath = path.join(rootDir, "public", "data", "records.json");

const SOURCE_LABELS = {
  "Taklit veya Tağşiş Yapılan Gıdalar (Temel Özelliği Etkileyen İçerik Eksikliği).xlsx":
    "Taklit / Tağşiş (İçerik Eksikliği)",
  "sağlığı_tehlikeye_düşürecek_gıdalar.xlsx": "Sağlığı Tehlikeye Düşürecek Gıdalar",
  "taklitvetağşiş_aynıdeğeri_taşımayan_maddeeklenmesi.xlsx":
    "Taklit / Tağşiş (Madde Eklenmesi)",
};

function clean(value) {
  if (value == null) return "";
  return String(value).replace(/\s+/g, " ").trim();
}

function readWorkbook(filePath) {
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
}

function convertWorkbook(fileName, rows) {
  if (!rows.length) return [];

  const headerRowIndex = rows.findIndex((row) =>
    row.some((cell) => clean(cell).toLowerCase() === "firma adı"),
  );

  if (headerRowIndex === -1) {
    console.warn(`Header not found in ${fileName}, skipping.`);
    return [];
  }

  const headers = rows[headerRowIndex].map((cell) => clean(cell));
  const columnIndex = {
    announcementDate: headers.findIndex((h) => h === "Kamuoyu Duyuru Tarihi"),
    company: headers.findIndex((h) => h === "Firma Adı"),
    product: headers.findIndex((h) => h === "Marka / Ürün Adı"),
    issue: headers.findIndex((h) => h === "Uygunsuzluk"),
    batch: headers.findIndex((h) => h === "Parti / Seri Numarası"),
    location: headers.findIndex((h) => h === "İl / İlçe"),
    productGroup: headers.findIndex((h) => h === "Ürün Grubu"),
  };

  const sourceLabel = SOURCE_LABELS[fileName] ?? fileName;
  const records = [];

  for (let rowIndex = headerRowIndex + 1; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const company = clean(row[columnIndex.company]);
    const product = clean(row[columnIndex.product]);

    if (!company && !product) continue;

    records.push({
      id: `${fileName}-${rowIndex}`,
      sourceFile: fileName,
      sourceLabel,
      announcementDate: clean(row[columnIndex.announcementDate]),
      company,
      product,
      issue: clean(row[columnIndex.issue]),
      batch: clean(row[columnIndex.batch]),
      location: clean(row[columnIndex.location]),
      productGroup: clean(row[columnIndex.productGroup]),
    });
  }

  return records;
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error(`Data directory not found: ${dataDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.toLowerCase().endsWith(".xlsx"))
    .sort();

  if (!files.length) {
    console.error("No .xlsx files found in data directory.");
    process.exit(1);
  }

  const allRecords = [];

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const rows = readWorkbook(filePath);
    const records = convertWorkbook(file, rows);
    allRecords.push(...records);
    console.log(`${file}: ${records.length} records`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allRecords, null, 0), "utf8");
  console.log(`Wrote ${allRecords.length} records to ${outputPath}`);
}

main();
