import { motion } from "motion/react";
import { Mail, Phone, MapPin, Award } from "lucide-react";

const footerLinks = {
  iletisim: [
    { icon: Mail, text: "info@merestohum.com.tr" },
    { icon: Phone, text: "+90 (312) 555 0123" },
    { icon: MapPin, text: "Ankara, Türkiye" },
  ],
  hakkimizda: [
    { text: "Hakkımızda", href: "#about" },
    { text: "Vizyonumuz", href: "#vision" },
    { text: "Misyonumuz", href: "#vision" },
  ],
  urunler: [
    { text: "Tohumlar", href: "#products" },
    { text: "Fideler", href: "#products" },
    { text: "Gübreler", href: "#products" },
  ],
  gizlilik: [
    { text: "Gizlilik Politikası", href: "#" },
    { text: "KVKK Aydınlatma Metni", href: "#" },
    { text: "Kullanım Koşulları", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary-earth)', color: '#E2DCD5' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* İletişim */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              İletişim
            </h3>
            <ul className="space-y-4">
              {footerLinks.iletisim.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  {item.icon && <item.icon size={18} style={{ color: 'var(--primary-green-light)' }} />}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Hakkımızda */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Kurumsal
            </h3>
            <ul className="space-y-3">
              {footerLinks.hakkimizda.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Ürünler */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Ürünlerimiz
            </h3>
            <ul className="space-y-3">
              {footerLinks.urunler.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Gizlilik & KVKK */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Yasal
            </h3>
            <ul className="space-y-3">
              {footerLinks.gizlilik.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(226, 220, 213, 0.2)' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
            © 2026 Meres Tohum. Tüm hakları saklıdır. | Kaliteli tohum, fide ve gübre çözümleri
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
