import { motion } from "motion/react";
import { Leaf, Target } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-cream)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--text-dark)',
            }}
          >
            Hakkımızda
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ height: '400px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Meres Tohum tarım alanları"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div
              className="flex items-start gap-4 p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--background-soft-green)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--primary-green-dark)' }}
              >
                <Leaf size={24} color="#ffffff" />
              </div>
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Meres Tohum Kimdir?
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-gray)',
                    lineHeight: 1.7,
                  }}
                >
                  2026 yılından bu yana Türk tarımına hizmet eden Meres Tohum, kaliteli tohum, fide ve gübre üretimi ile çiftçilerimizin yanındadır. Organik ve sertifikalı ürünlerimizle sürdürülebilir tarımı destekliyoruz.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-4 p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--background-soft-green)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-safe)' }}
              >
                <Target size={24} color="#ffffff" />
              </div>
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Neden Meres Tohum?
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-gray)',
                    lineHeight: 1.7,
                  }}
                >
                  T.C. Tarım ve Orman Bakanlığı onaylı ürünlerimiz, laboratuvar testlerinden geçer. ISO 9001:2015 sertifikamızla kalite güvencesi sunarız. 40+ yıllık tecrübemizle 50.000+ çiftçiye hizmet verdik.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
