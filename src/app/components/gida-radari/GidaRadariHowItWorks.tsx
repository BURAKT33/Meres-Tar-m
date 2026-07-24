import { motion } from "motion/react";
import { Camera, ShieldCheck, Bookmark } from "lucide-react";
import { GidaRadariLanguage, gidaRadariCopy } from "./i18n";

const stepIcons = [Camera, ShieldCheck, Bookmark];

const glassCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.75)",
  boxShadow: "0 8px 32px rgba(44, 62, 67, 0.08)",
} as const;

export function GidaRadariHowItWorks({ language }: { language: GidaRadariLanguage }) {
  const copy = gidaRadariCopy[language].howItWorks;

  return (
    <section style={{ backgroundColor: "var(--gr-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
          style={{
            fontFamily: "var(--gr-font)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {copy.heading}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {copy.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-3xl p-8"
              style={glassCardStyle}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "var(--gr-helper)" }}
              >
                <Icon size={28} style={{ color: "var(--gr-text)" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--gr-text)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "0.95rem",
                  color: "var(--gr-hint)",
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </motion.div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {copy.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="text-center"
            >
              <p
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
