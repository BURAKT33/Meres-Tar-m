import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 100%), var(--background-cream)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center lg:text-left"
        >
          <h1
            className="leading-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--text-dark)',
            }}
          >
            Toprağın gücü,<br />sofraların güvencesi
          </h1>

          <p
            className="max-w-xl mx-auto lg:mx-0"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--text-gray)',
              lineHeight: 1.7,
            }}
          >
            Kaliteli tohum, fide ve gübre çözümleri. Bakanlık onaylı ürünlerle tarımda güvenilir ortak.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full transition-all shadow-lg inline-block"
              style={{
                backgroundColor: 'var(--primary-green-dark)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Ürünlerimizi Keşfet
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full transition-all inline-block"
              style={{
                border: '2px solid var(--primary-green-dark)',
                color: 'var(--primary-green-dark)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Hakkımızda
            </motion.a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Tarım alanları havadan görünüm"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
