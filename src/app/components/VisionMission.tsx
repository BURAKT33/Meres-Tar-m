import { motion } from "motion/react";
import { Eye, Compass } from "lucide-react";

export function VisionMission() {
  return (
    <section id="vision" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-cream)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--text-dark)',
            }}
          >
            Vizyon & Misyon
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vizyon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-12 shadow-xl"
            style={{
              backgroundColor: 'var(--background-soft-green)',
              border: '2px solid var(--primary-green-dark)',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: 'var(--primary-green-dark)' }}
            >
              <Eye size={32} color="#ffffff" />
            </div>

            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
              }}
            >
              Vizyonumuz
            </h3>

            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--text-gray)',
                lineHeight: 1.8,
              }}
            >
              Türkiye'nin en güvenilir tarımsal girdi tedarikçisi olarak, sürdürülebilir tarım uygulamalarını yaygınlaştırmak ve gelecek nesillere verimli topraklar bırakmak.
            </p>

            <div className="space-y-3">
              {[
                "Organik tarımda lider marka",
                "Yenilikçi tohum teknolojileri",
                "Çevre dostu üretim süreçleri",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--primary-green-dark)' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--text-dark)',
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Misyon */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-12 shadow-xl"
            style={{
              backgroundColor: 'var(--background-soft-green)',
              border: '2px solid var(--accent-safe)',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: 'var(--accent-safe)' }}
            >
              <Compass size={32} color="#ffffff" />
            </div>

            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
              }}
            >
              Misyonumuz
            </h3>

            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--text-gray)',
                lineHeight: 1.8,
              }}
            >
              Çiftçilerimize en kaliteli tohum, fide ve gübre ürünlerini sunarak tarımsal verimliliği artırmak, gıda güvenliğini sağlamak ve kırsal kalkınmaya katkıda bulunmak.
            </p>

            <div className="space-y-3">
              {[
                "Kalite kontrollü ürün garantisi",
                "Uygun fiyatlarla erişilebilirlik",
                "Teknik destek ve danışmanlık",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-safe)' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--text-dark)',
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
