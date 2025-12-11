import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ProductionHero from "@/components/sections/ProductionHero";

export const metadata: Metadata = {
  title: "Production | OdinLab Studios",
  description: "Кинематографический видео-продакшн.",
};

export default function ProductionPage() {
  return (
    <>
      <Header />
      <main>
        <ProductionHero />
        
        {/* Галерея работ будет добавлена на следующем этапе */}
        <section className="py-20 bg-black text-center text-gray-500 font-mono text-sm">
           // Галерея работ будет добавлена на следующем этапе
        </section>
        
      </main>
      <Footer />
    </>
  );
}
