import { motion } from "motion/react";
import { Sprout, Trees, Droplet } from "lucide-react";

const products = [
  {
    icon: Sprout,
    category: "Tohumlar",
    items: [
      "Sebze tohumları (domates, biber, patlıcan)",
      "Tahıl tohumları (buğday, arpa, mısır)",
      "Organik ve hibrit çeşitler",
      "Yerel tohum koleksiyonu"
    ],
    image: "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--primary-green-dark)",
  },
  {
    icon: Trees,
    category: "Fideler",
    items: [
      "Meyve fidanları (elma, armut, şeftali)",
      "Sebze fideleri (domates, biber, salatalık)",
      "Süs bitkileri fidesi",
      "Aşılı ve sertifikalı fideler"
    ],
    image: "https://images.unsplash.com/photo-1576181456177-2b99ac0aa1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--primary-green-light)",
  },
  {
    icon: Droplet,
    category: "Gübreler",
    items: [
      "Organik gübreler (ahır gübresi, kompost)",
      "Kimyasal gübreler (NPK, üre)",
      "Sıvı gübreler ve yaprak gübreleri",
      "Toprak düzenleyiciler"
    ],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "var(--accent-warning)",
  },
];

export function Products() {
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
            Ürünlerimiz
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-gray)',
            }}
          >
            Kaliteli tohum, fide ve gübre çeşitlerimiz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.category}
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
                  alt={product.category}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}20` }}
                  >
                    <product.icon size={24} style={{ color: product.color }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--text-dark)',
                    }}
                  >
                    {product.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {product.items.map((item, idx) => (
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
                  Detaylı Bilgi
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
