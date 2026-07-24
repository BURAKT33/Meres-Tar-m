import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { GidaRadariLanguage } from "./gida-radari/i18n";
import { homeCopy } from "./home-i18n";

const contactInfo = [
  {
    icon: Phone,
    info: "+90 506 707 19 78",
  },
  {
    icon: Mail,
    info: "info@merestohum.com.tr",
  },
  {
    icon: MapPin,
    info: "Eskişehir, Türkiye",
  },
  {
    icon: Clock,
    info: "Pazartesi - Cuma: 08:00 - 18:00",
  },
];

export function Contact({ language }: { language: GidaRadariLanguage }) {
  const copy = homeCopy[language].contact;

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background-soft-green)' }}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const contact = copy.info[index];
            const info = "info" in contact ? contact.info : item.info;
            return (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl p-6 shadow-lg transition-all"
              style={{ backgroundColor: 'var(--background-cream)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--primary-green-light)' }}
              >
                <item.icon size={28} style={{ color: 'var(--primary-green-dark)' }} />
              </div>

              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                }}
              >
                {contact.title}
              </h3>

              <p
                className="mb-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--primary-green-dark)',
                  fontWeight: 500,
                }}
              >
                {info}
              </p>

              {contact.subInfo ? (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-gray)',
                  }}
                >
                  {contact.subInfo}
                </p>
              ) : null}
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl p-8 lg:p-12 shadow-xl"
          style={{ backgroundColor: 'var(--background-cream)' }}
        >
          <h3
            className="mb-6 text-center"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
            }}
          >
            {copy.formTitle}
          </h3>

          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                }}
              >
                {copy.fullName}
              </label>
              <input
                type="text"
                placeholder={copy.fullNamePlaceholder}
                className="w-full px-4 py-3 rounded-2xl outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--border-light)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-dark)',
                }}
              />
            </div>

            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                }}
              >
                {copy.email}
              </label>
              <input
                type="email"
                placeholder="ornek@email.com"
                className="w-full px-4 py-3 rounded-2xl outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--border-light)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-dark)',
                }}
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                }}
              >
                {copy.message}
              </label>
              <textarea
                rows={5}
                placeholder={copy.messagePlaceholder}
                className="w-full px-4 py-3 rounded-2xl outline-none transition-all focus:ring-2 resize-none"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--border-light)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-dark)',
                }}
              />
            </div>

            <div className="md:col-span-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 rounded-full transition-all shadow-lg"
                style={{
                  backgroundColor: 'var(--primary-green-dark)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                {copy.submit}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
