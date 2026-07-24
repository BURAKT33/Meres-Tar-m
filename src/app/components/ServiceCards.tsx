import { motion } from "motion/react";
import { Sprout, Package, ShieldCheck } from "lucide-react";
import { GidaRadariLanguage } from "./gida-radari/i18n";
import { homeCopy } from "./home-i18n";

const serviceIcons = [Sprout, Package, ShieldCheck];

export function ServiceCards({ language }: { language: GidaRadariLanguage }) {
  const copy = homeCopy[language].services;

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
            {copy.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {copy.items.map((service, index) => {
            const Icon = serviceIcons[index];
            const highlight = index === 2;
            return (
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
                borderLeft: highlight ? '4px solid var(--accent-warning)' : 'none',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--primary-green-light)' }}
              >
                <Icon size={32} style={{ color: 'var(--primary-green-dark)' }} />
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
                {copy.link} →
              </a>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
