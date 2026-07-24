import { Header } from "../components/Header";
import { ProductSearch } from "../components/ProductSearch";
import { Footer } from "../components/Footer";
import { GidaRadariHero } from "../components/gida-radari/GidaRadariHero";
import { GidaRadariHowItWorks } from "../components/gida-radari/GidaRadariHowItWorks";
import { GidaRadariAppPreview } from "../components/gida-radari/GidaRadariAppPreview";
import { GidaRadariPremium } from "../components/gida-radari/GidaRadariPremium";
import { GidaRadariTrust } from "../components/gida-radari/GidaRadariTrust";
import { GidaRadariLanguage } from "../components/gida-radari/i18n";
import { useState } from "react";
import "../components/gida-radari/gida-radari-theme.css";

export default function GidaRadariPage() {
  const [language, setLanguage] = useState<GidaRadariLanguage>("tr");

  return (
    <div className="min-h-screen gida-radari-page">
      <Header language={language} onLanguageChange={setLanguage} />
      <main dir={language === "ar" ? "rtl" : "ltr"}>
        <GidaRadariHero language={language} />
        <GidaRadariHowItWorks language={language} />
        <GidaRadariAppPreview language={language} />
        <GidaRadariPremium language={language} />
        <GidaRadariTrust language={language} />
        <div id="sorgula">
          <ProductSearch variant="gidaradari" language={language} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
