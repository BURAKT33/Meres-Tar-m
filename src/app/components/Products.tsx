import { motion } from "motion/react";
import { Sprout, Trees, Droplet, ScanSearch, ArrowRight } from "lucide-react";
import { GIDA_AJANI_URL } from "../constants";
import { GidaRadariLanguage } from "./gida-radari/i18n";
import { homeCopy } from "./home-i18n";

const productMeta = [
  {
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--primary-green-dark)",
  },
  {
    icon: Trees,
    image: "https://images.unsplash.com/photo-1576181456177-2b99ac0aa1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--primary-green-light)",
  },
  {
    icon: Droplet,
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--accent-warning)",
  },
];

export function Products({ language }: { language: GidaRadariLanguage }) {
  const { navigation, products: copy } = homeCopy[language];

  return (
    <section id="products" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-soft-green)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
            {copy.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-gray)',
            }}
          >
            {copy.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {productMeta.map((product, index) => {
            const productCopy = copy.items[index];
            const Icon = product.icon;
            return (
            <motion.div
              key={productCopy.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{ backgroundColor: 'var(--background-cream)' }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={productCopy.category}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}20` }}
                  >
                    <Icon size={24} style={{ color: product.color }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--text-dark)',
                    }}
                  >
                    {productCopy.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {productCopy.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--text-gray)',
                      }}
                    >
                      <span style={{ color: product.color, marginTop: '4px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 px-6 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: product.color,
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                  }}
                >
                  {copy.detail}
                </motion.button>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-3xl p-8 lg:p-10"
          style={{
            backgroundColor: 'var(--background-cream)',
            border: '1px solid var(--border-light)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255, 140, 66, 0.12)' }}
            >
              <ScanSearch size={28} style={{ color: 'var(--accent-warning)' }} />
            </div>

            <div className="flex-1">
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                }}
              >
                {navigation.gidaAjani}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-gray)',
                  lineHeight: 1.6,
                  maxWidth: '40rem',
                }}
              >
                {copy.gidaAjaniDescription}
              </p>
            </div>

            <a
              href={GIDA_AJANI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full"
                style={{
                  backgroundColor: 'var(--accent-warning)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                }}
              >
                {copy.gidaAjaniLink}
                <ArrowRight size={18} />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
