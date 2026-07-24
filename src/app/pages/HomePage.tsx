import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ServiceCards } from "../components/ServiceCards";
import { Products } from "../components/Products";
import { About } from "../components/About";
import { VisionMission } from "../components/VisionMission";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { GidaRadariLanguage } from "../components/gida-radari/i18n";
import { useState } from "react";

export default function HomePage() {
  const [language, setLanguage] = useState<GidaRadariLanguage>("tr");

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />
      <main dir={language === "ar" ? "rtl" : "ltr"}>
        <Hero language={language} />
        <ServiceCards language={language} />
        <Products language={language} />
        <About language={language} />
        <VisionMission language={language} />
        <Contact language={language} />
      </main>
      <Footer />
    </div>
  );
}
