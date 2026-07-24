import { motion } from "motion/react";
import { Radar, Smartphone } from "lucide-react";
import { GidaRadariLanguage, gidaRadariCopy } from "./i18n";

const storeButtonStyle = {
  fontFamily: "var(--gr-font)",
  fontWeight: 600,
  fontSize: "0.95rem",
} as const;

export function GidaRadariHero({ language }: { language: GidaRadariLanguage }) {
  const copy = gidaRadariCopy[language].hero;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--gr-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--gr-primary)" }}
            >
              <Radar size={22} color="#ffffff" />
            </div>
            <span
              style={{
                fontFamily: "var(--gr-font)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--gr-text)",
              }}
            >
              Gıda Radarı
            </span>
          </div>

          <h1
            className="leading-tight whitespace-pre-line"
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "var(--gr-text)",
            }}
          >
            {copy.title}
          </h1>

          <p
            className="max-w-lg mx-auto lg:mx-0"
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--gr-hint)",
              lineHeight: 1.7,
            }}
          >
            {copy.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-full transition-all shadow-md inline-flex items-center justify-center gap-2"
              style={{
                ...storeButtonStyle,
                backgroundColor: "var(--gr-text)",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {copy.appStore}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-full transition-all shadow-md inline-flex items-center justify-center gap-2"
              style={{
                ...storeButtonStyle,
                backgroundColor: "var(--gr-cta)",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {copy.googlePlay}
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex items-center justify-center min-h-[360px] lg:min-h-[440px]"
        >
          <div
            className="absolute inset-8 rounded-[40%] blur-2xl opacity-70"
            style={{ backgroundColor: "var(--gr-helper)" }}
          />
          <div
            className="relative w-64 h-[420px] lg:w-72 lg:h-[460px] rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-6"
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid var(--gr-primary)",
            }}
          >
            <div
              className="w-full flex-1 rounded-2xl mb-4 flex flex-col items-center justify-center gap-4"
              style={{ backgroundColor: "var(--gr-helper)" }}
            >
              <Smartphone size={48} style={{ color: "var(--gr-primary)" }} />
              <div className="text-center px-4">
                <p
                  style={{
                    fontFamily: "var(--gr-font)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--gr-text)",
                  }}
                >
                  {copy.scanProduct}
                </p>
                <p
                  style={{
                    fontFamily: "var(--gr-font)",
                    fontSize: "0.75rem",
                    color: "var(--gr-hint)",
                    marginTop: "0.25rem",
                  }}
                >
                  {copy.getResult}
                </p>
              </div>
            </div>
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: "var(--gr-primary)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
