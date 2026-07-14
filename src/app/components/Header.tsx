import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "@/assets/logo.png";

const sectionItems = [
  { label: "Ürünler", hash: "products" },
  { label: "Hakkımızda", hash: "about" },
  { label: "Vizyon & Misyon", hash: "vision" },
  { label: "İletişim", hash: "contact" },
];

function sectionHref(hash: string, pathname: string) {
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isGidaRadari = pathname === "/gida-radari";

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
                Ana Sayfa
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
                GıdaRadarı
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            style={{ color: "var(--primary-green-dark)" }}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
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
              Ana Sayfa
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
              GıdaRadarı
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
