import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import { GidaRadariLanguage, gidaRadariCopy } from "./i18n";

export function GidaRadariTrust({ language }: { language: GidaRadariLanguage }) {
  const copy = gidaRadariCopy[language].trust;

  return (
    <section style={{ backgroundColor: "var(--gr-helper)" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: "rgba(162, 185, 151, 0.35)" }}
          >
            <Building2 size={32} style={{ color: "var(--gr-text)" }} />
          </div>

          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontWeight: 700,
              color: "var(--gr-text)",
            }}
          >
            {copy.title}
          </h2>

          <p
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "1.05rem",
              color: "var(--gr-hint)",
              lineHeight: 1.75,
            }}
          >
            {copy.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
