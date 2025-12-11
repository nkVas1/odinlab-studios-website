import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Games Division | OdinLab Studios",
  description:
    "Разработка качественных инди-игр, игровых ассетов и уникальных игровых механик.",
  keywords: ["инди-игры", "разработка игр", "геймдев", "игровые ассеты", "unity", "unreal engine"],
};

export default function GamesPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex items-center justify-center text-center min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-7xl font-bold mb-6">
            Games <span className="text-odin-gold">Division</span>
          </h1>
          <p className="mt-4 text-xl text-odin-muted max-w-2xl mx-auto">
            Мы создаем не просто игры, а целые миры. Наша страсть — это высококачественные
            инди-проекты, запоминающиеся игровые ассеты и инновационные механики, которые
            бросают вызов стандартам.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">Инди-игры</h3>
              <p className="text-odin-muted">
                Разработка оригинальных игр с уникальным геймплеем и стилистикой
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">Игровые Ассеты</h3>
              <p className="text-odin-muted">
                Создание 3D-моделей, текстур, анимаций и звукового контента для игр
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: "var(--accent-color)" }}>
              <h3 className="font-display text-2xl font-bold mb-3">
                Геймплей-дизайн
              </h3>
              <p className="text-odin-muted">
                Проектирование механик и систем, которые делают игры увлекательными
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6">Наше видение</h2>
            <p className="text-lg text-odin-muted">
              Games Division — это место, где технология встречается с искусством. Мы верим,
              что каждая игра — это интерактивное произведение искусства, которое может
              трогать сердца и вдохновлять игроков. От концепции до релиза, мы вкладываем
              душу в каждый проект.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
