import { motion } from "motion/react";
import { TrendingUp, Shield, AlertCircle } from "lucide-react";

const widgets = [
  {
    icon: TrendingUp,
    title: "Son 30 günde",
    value: "12.400",
    description: "ürün sorgulandı",
    color: "var(--primary-green-dark)",
  },
  {
    icon: Shield,
    title: "Bakanlık ile",
    value: "Anlık",
    description: "entegre veri",
    color: "var(--accent-safe)",
  },
  {
    icon: AlertCircle,
    title: "Bugünün şüpheli ürünü",
    value: "Bal",
    description: "kategorisinde 2 hile",
    color: "var(--accent-warning)",
    highlight: true,
  },
];

export function SocialProof() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: 'var(--background-soft-green)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {widgets.map((widget, index) => (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="min-w-[280px] rounded-3xl p-6 shadow-lg transition-all cursor-pointer"
              style={{
                backgroundColor: 'var(--background-cream)',
                border: widget.highlight ? '2px solid var(--accent-warning)' : '1px solid var(--border-light)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${widget.color}20` }}
                >
                  <widget.icon size={28} style={{ color: widget.color }} />
                </div>

                <div className="flex-1">
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--text-gray)',
                    }}
                  >
                    {widget.title}
                  </p>

                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: widget.color,
                    }}
                  >
                    {widget.value}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--text-gray)',
                    }}
                  >
                    {widget.description}
                  </p>
                </div>
              </div>

              {widget.highlight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: 'var(--accent-warning)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  UYARI
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
