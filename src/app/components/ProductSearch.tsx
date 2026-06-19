import { motion } from "motion/react";
import {
  Search,
  AlertTriangle,
  Radar,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  GidaRadariMatch,
  hasFraudRecord,
  loadGidaRadariRecords,
  searchGidaRadariRecords,
} from "@/lib/gidaradariSearch";

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GidaRadariMatch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGidaRadariRecords()
      .catch(() => {
        setError("GıdaRadarı verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const records = await loadGidaRadariRecords();
      const matches = searchGidaRadariRecords(trimmedQuery, records, 5);
      setResults(matches);
      setHasSearched(true);
    } catch {
      setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

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
            Bu ürün daha önce hile yapmış mı?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              color: "var(--text-gray)",
            }}
          >
            <strong style={{ color: "var(--text-dark)" }}>GıdaRadarı</strong> ile T.C. Tarım ve
            Orman Bakanlığı kayıtlarından anlık sorgulama yapın
          </p>
        </motion.div>

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
                placeholder="Ürün adı veya barkod gir (örnek: bal, zeytinyağı, Yöre Bal)"
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

        {hasSearched && !error && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            {results.length > 0 ? (
              <>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--text-gray)",
                  }}
                >
                  <strong style={{ color: "var(--text-dark)" }}>{results.length}</strong> en yakın
                  sonuç listelendi
                </p>

                {results.map(({ record, score }, index) => {
                  const isFraud = hasFraudRecord(record.issue);

                  return (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="rounded-3xl p-6 shadow-lg"
                      style={{
                        backgroundColor: isFraud
                          ? "rgba(255, 140, 66, 0.1)"
                          : "rgba(45, 106, 79, 0.08)",
                        border: `2px solid ${isFraud ? "var(--accent-warning)" : "var(--primary-green-light)"}`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: isFraud
                              ? "var(--accent-warning)"
                              : "var(--primary-green-dark)",
                          }}
                        >
                          {isFraud ? (
                            <AlertTriangle size={24} color="#ffffff" />
                          ) : (
                            <CheckCircle2 size={24} color="#ffffff" />
                          )}
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
                              {record.brand} · {record.name}
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
                            className="mb-2"
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.95rem",
                              color: "var(--text-gray)",
                            }}
                          >
                            Kategori: {record.category}
                            {record.barcode ? ` · Barkod: ${record.barcode}` : ""}
                          </p>

                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "1rem",
                              color: "var(--text-dark)",
                              lineHeight: 1.6,
                            }}
                          >
                            <strong>
                              {record.year} yılında {record.issue.toLowerCase()}
                            </strong>
                            <br />
                            ({record.source})
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                  Aramanıza yakın bir kayıt bulunamadı. Farklı bir ürün adı veya barkod deneyin.
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
              ? "GıdaRadarı verileri yükleniyor..."
              : "💡 İpucu: Ürün adını veya barkod numarasını girerek en yakın kayıtları listeleyebilirsiniz"}
          </motion.p>
        )}
      </div>
    </section>
  );
}
