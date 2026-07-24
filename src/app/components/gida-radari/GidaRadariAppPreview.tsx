import { motion } from "motion/react";
import { GidaRadariLanguage, gidaRadariCopy } from "./i18n";
import riskyResultImage from "../../../../WhatsApp Image 2026-07-24 at 12.06.49.jpeg";
import safeResultImage from "../../../../WhatsApp Image 2026-07-24 at 12.07.54.jpeg";
import historyImage from "../../../../WhatsApp Image 2026-07-24 at 12.09.48.jpeg";

const previewImages = [riskyResultImage, historyImage, safeResultImage];

export function GidaRadariAppPreview({ language }: { language: GidaRadariLanguage }) {
  const copy = gidaRadariCopy[language].appPreview;

  return (
    <section
      className="overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--gr-helper) 0%, var(--gr-bg) 55%, rgba(162, 185, 151, 0.26) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 lg:mb-16"
        >
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--gr-cta)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {copy.eyebrow}
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--gr-font)",
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              fontWeight: 800,
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
              lineHeight: 1.7,
            }}
          >
            {copy.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-end justify-items-center max-w-5xl mx-auto">
          {previewImages.map((image, index) => (
            <motion.figure
              key={copy.captions[index]}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 1 ? "md:-translate-y-6" : ""}
            >
              <div
                className="rounded-[2rem] p-2.5 shadow-2xl"
                style={{
                  backgroundColor: "#1e2728",
                  border: "3px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 22px 42px rgba(44, 62, 67, 0.2)",
                }}
              >
                <img
                  src={image}
                  alt={copy.imageAlt[index]}
                  className="w-full max-w-[190px] lg:max-w-[220px] rounded-[1.45rem] block"
                />
              </div>
              <figcaption
                className="text-center mt-5"
                style={{
                  fontFamily: "var(--gr-font)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--gr-text)",
                }}
              >
                {copy.captions[index]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
