import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    info: "+90 (312) 555 0123",
    subInfo: "Hafta içi 08:00 - 18:00",
  },
  {
    icon: Mail,
    title: "E-posta",
    info: "info@merestohum.com.tr",
    subInfo: "24 saat içinde yanıt veriyoruz",
  },
  {
    icon: MapPin,
    title: "Adres",
    info: "Atatürk Bulvarı No:123",
    subInfo: "Çankaya, Ankara",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    info: "Pazartesi - Cuma: 08:00 - 18:00",
    subInfo: "Cumartesi: 09:00 - 14:00",
  },
];

export function Contact() {
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
            İletişim
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-gray)',
            }}
          >
            Sorularınız için bize ulaşın
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
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
                {item.title}
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
                {item.info}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-gray)',
                }}
              >
                {item.subInfo}
              </p>
            </motion.div>
          ))}
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
            Bize Mesaj Gönderin
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
                Ad Soyad
              </label>
              <input
                type="text"
                placeholder="Adınız ve soyadınız"
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
                E-posta
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
                Mesajınız
              </label>
              <textarea
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
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
                Mesaj Gönder
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
