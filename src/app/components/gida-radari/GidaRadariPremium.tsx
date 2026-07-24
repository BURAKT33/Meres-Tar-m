import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { GidaRadariLanguage, gidaRadariCopy } from "./i18n";

export function GidaRadariPremium({ language }: { language: GidaRadariLanguage }) {
  const copy = gidaRadariCopy[language].premium;

  return (
    <section style={{ backgroundColor: "var(--gr-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(255, 138, 101, 0.12)",
                border: "1px solid var(--gr-cta)",
              }}
            >
              <Sparkles size={16} style={{ color: "var(--gr-cta)" }} />
              <span
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--gr-cta)",
                }}
              >
                {copy.label}
              </span>
            </div>

            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--gr-font)",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--gr-text)",
              }}
            >
              {copy.title}
            </h2>

            <p
              className="mb-8"
              style={{
                fontFamily: "var(--gr-font)",
                fontSize: "1.05rem",
                color: "var(--gr-hint)",
                lineHeight: 1.7,
              }}
            >
              {copy.description}
            </p>

            <ul className="space-y-5 mb-10">
              {copy.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "var(--gr-primary)" }}
                  >
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--gr-font)",
                      fontSize: "0.95rem",
                      color: "var(--gr-text)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex px-8 py-3.5 rounded-full shadow-md"
              style={{
                fontFamily: "var(--gr-font)",
                fontWeight: 600,
                fontSize: "0.95rem",
                backgroundColor: "var(--gr-cta)",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {copy.button}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div
              className="rounded-3xl p-8 lg:p-10"
              style={{
                backgroundColor: "var(--gr-helper)",
                border: "1px solid rgba(162, 185, 151, 0.4)",
              }}
            >
              <div className="space-y-4">
                {copy.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl p-5 flex items-center justify-between"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--gr-font)",
                        fontWeight: 600,
                        color: "var(--gr-text)",
                      }}
                    >
                      {item}
                    </span>
                    <Check size={20} style={{ color: "var(--gr-primary)" }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
