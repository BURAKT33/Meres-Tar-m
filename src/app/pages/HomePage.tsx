import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ServiceCards } from "../components/ServiceCards";
import { Products } from "../components/Products";
import { About } from "../components/About";
import { VisionMission } from "../components/VisionMission";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServiceCards />
        <Products />
        <About />
        <VisionMission />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
