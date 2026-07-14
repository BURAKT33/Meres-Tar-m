import { Header } from "../components/Header";
import { ProductSearch } from "../components/ProductSearch";
import { Footer } from "../components/Footer";

export default function GidaRadariPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductSearch />
      </main>
      <Footer />
    </div>
  );
}
