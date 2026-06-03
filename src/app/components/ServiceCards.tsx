import { motion } from "motion/react";
import { Sprout, Package, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Sertifikalı Tohumlar",
    description: "Sebze, tahıl ve organik tohum çeşitlerimiz. T.C. Tarım Bakanlığı onaylı, laboratuvar testli ürünler.",
    link: "Hemen incele",
    highlight: false,
  },
  {
    icon: Package,
    title: "Fide & Gübre",
    description: "Meyve fidanları, sebze fideleri ve organik gübreler. Kaliteli üretim, uygun fiyat.",
    link: "Hemen incele",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "Gıda Güvenlik Skoru",
    description: "Ürünlerin geçmiş hile kayıtları ve güvenlik skorları. T.C. Tarım Bakanlığı verileri.",
    link: "Hemen incele",
    highlight: true,
  },
];

export function ServiceCards() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-soft-green)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.75rem, 4vw, 2rem)',
              fontWeight: 500,
              color: 'var(--text-dark)',
            }}
          >
            Hizmetlerimiz
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl p-8 shadow-lg transition-all duration-300"
              style={{
                backgroundColor: 'var(--background-cream)',
                borderLeft: service.highlight ? '4px solid var(--accent-warning)' : 'none',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--primary-green-light)' }}
              >
                <service.icon size={32} style={{ color: 'var(--primary-green-dark)' }} />
              </div>

              <h3
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                }}
              >
                {service.title}
              </h3>

              <p
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-gray)',
                  lineHeight: 1.6,
                }}
              >
                {service.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 transition-all hover:gap-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--primary-green-dark)',
                }}
              >
                {service.link} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
