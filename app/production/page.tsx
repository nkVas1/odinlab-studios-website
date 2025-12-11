import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "OdinLab Production | Профессиональный продакшн",
  description:
    "Профессиональное продюсирование, видео-продакшн и креативное продвижение проектов.",
};

export default function ProductionPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex items-center justify-center text-center min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-7xl font-bold mb-6">
            OdinLab <span className="text-odin-gold">Production</span>
          </h1>
          <p className="mt-4 text-xl text-odin-muted max-w-2xl mx-auto">
            Мы превращаем идеи в захватывающие визуальные истории. От сценария до
            пост-продакшена, каждый проект получает тщательное внимание и профессиональное
            исполнение.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">Видеопродакшн</h3>
              <p className="text-odin-muted">
                Съемка, монтаж и пост-продакшен высочайшего качества
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">
                Аудиопроизводство
              </h3>
              <p className="text-odin-muted">
                Профессиональная звукозапись, музыка и звуковой дизайн
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">
                Промо-материалы
              </h3>
              <p className="text-odin-muted">
                Создание привлекательных материалов для маркетинга и социальных сетей
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
