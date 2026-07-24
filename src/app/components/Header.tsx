import { motion } from "motion/react";
import { Globe2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "@/assets/logo.png";
import { GidaRadariLanguage, gidaRadariLanguages } from "./gida-radari/i18n";
import { homeCopy } from "./home-i18n";

function sectionHref(hash: string, pathname: string) {
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

type HeaderProps = {
  language?: GidaRadariLanguage;
  onLanguageChange?: (language: GidaRadariLanguage) => void;
};

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isGidaRadari = pathname === "/gida-radari";
  const navigation = homeCopy[language ?? "tr"].navigation;
  const sectionItems = [
    { label: navigation.products, hash: "products" },
    { label: navigation.about, hash: "about" },
    { label: navigation.vision, hash: "vision" },
    { label: navigation.contact, hash: "contact" },
  ];

  const linkStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "var(--text-dark)",
  } as const;

  const activeStyle = {
    ...linkStyle,
    color: "var(--primary-green-dark)",
    fontWeight: 600,
  } as const;

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(253, 248, 240, 0.95)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center" aria-label="Meres Tohum ana sayfa">
              <img src={logo} alt="Meres Tohum" className="h-14 w-auto lg:h-16" />
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/"
                style={isHome ? activeStyle : linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-green-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isHome
                    ? "var(--primary-green-dark)"
                    : "var(--text-dark)";
                }}
              >
                {navigation.home}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <Link
                to="/gida-radari"
                style={isGidaRadari ? activeStyle : linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-green-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isGidaRadari
                    ? "var(--primary-green-dark)"
                    : "var(--text-dark)";
                }}
              >
                {navigation.gidaRadari}
              </Link>
            </motion.div>

            {sectionItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={sectionHref(item.hash, pathname)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 2) * 0.05 }}
                className="transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-green-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-dark)";
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {language && onLanguageChange && (
              <div
                className="hidden lg:flex items-center gap-1 rounded-full p-1"
                style={{
                  backgroundColor: "rgba(162, 185, 151, 0.16)",
                  border: "1px solid rgba(162, 185, 151, 0.45)",
                }}
                aria-label="Dil seçimi"
              >
                <Globe2 size={16} style={{ color: "var(--primary-green-dark)", marginLeft: "0.45rem" }} />
                {gidaRadariLanguages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onLanguageChange(item.code)}
                    className="rounded-full px-2.5 py-1 transition-colors"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: language === item.code ? "var(--primary-green-dark)" : "transparent",
                      color: language === item.code ? "#ffffff" : "var(--text-dark)",
                    }}
                    aria-pressed={language === item.code}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              style={{ color: "var(--primary-green-dark)" }}
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden lg:hidden"
        >
          <nav className="py-4 space-y-4">
            {language && onLanguageChange && (
              <div
                className="flex items-center gap-2 pb-3"
                style={{ borderBottom: "1px solid var(--border-light)" }}
                aria-label="Dil seçimi"
              >
                <Globe2 size={18} style={{ color: "var(--primary-green-dark)" }} />
                {gidaRadariLanguages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(item.code);
                      setIsMenuOpen(false);
                    }}
                    className="rounded-full px-3 py-1.5"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      backgroundColor: language === item.code ? "var(--primary-green-dark)" : "rgba(162, 185, 151, 0.16)",
                      color: language === item.code ? "#ffffff" : "var(--text-dark)",
                    }}
                    aria-pressed={language === item.code}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <Link
              to="/"
              className="block py-2 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: isHome ? 600 : 500,
                color: isHome ? "var(--primary-green-dark)" : "var(--text-dark)",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.home}
            </Link>
            <Link
              to="/gida-radari"
              className="block py-2 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: isGidaRadari ? 600 : 500,
                color: isGidaRadari ? "var(--primary-green-dark)" : "var(--text-dark)",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.gidaRadari}
            </Link>
            {sectionItems.map((item) => (
              <a
                key={item.label}
                href={sectionHref(item.hash, pathname)}
                className="block py-2 transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--text-dark)",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
