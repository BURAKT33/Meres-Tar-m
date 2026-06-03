import { motion } from "motion/react";
import { Search, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function ProductSearch() {
  const [showResult, setShowResult] = useState(false);

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-cream)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--text-dark)',
            }}
          >
            Bu ürün daha önce hile yapmış mı?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-gray)',
            }}
          >
            Bakanlık kayıtlarından anlık sorgulama yapın
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div
            className="flex flex-col sm:flex-row gap-4 p-3 rounded-full shadow-xl"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid var(--border-light)',
            }}
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={24} style={{ color: 'var(--text-gray)' }} />
              <input
                type="text"
                placeholder="Ürün adı veya barkod gir (örnek: zeytinyağı X marka)"
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-dark)',
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResult(!showResult)}
              className="px-8 py-3 rounded-full transition-all shadow-lg"
              style={{
                backgroundColor: 'var(--accent-warning)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              Sorgula
            </motion.button>
          </div>
        </motion.div>

        {/* Example Result */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: showResult ? 1 : 0,
            height: showResult ? 'auto' : 0,
          }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: showResult ? 1 : 0.9 }}
            className="rounded-3xl p-6 shadow-lg"
            style={{
              backgroundColor: 'rgba(255, 140, 66, 0.1)',
              border: '2px solid var(--accent-warning)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-warning)' }}
              >
                <AlertTriangle size={24} color="#ffffff" />
              </div>

              <div>
                <h4
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Örnek Sonuç
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-gray)',
                    lineHeight: 1.6,
                  }}
                >
                  <strong>2022 yılında 'Yöre Bal' markasında tağşiş tespit edildi</strong>
                  <br />
                  (T.C. Tarım ve Orman Bakanlığı resmi kayıtları)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {!showResult && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-gray)',
            }}
          >
            💡 İpucu: Ürün adını veya barkod numarasını girerek sorgulama yapabilirsiniz
          </motion.p>
        )}
      </div>
    </section>
  );
}
