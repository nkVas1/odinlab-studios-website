import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import StyleShowcase from "@/components/features/StyleShowcase";

export const metadata: Metadata = {
  title: "Услуги | OdinLab Studios",
  description:
    "Полный спектр цифровых услуг: от веб-разработки и дизайна до геймдева и продюсирования.",
  keywords: [
    "услуги",
    "веб-разработка",
    "дизайн",
    "геймдев",
    "маркетинг",
    "SEO",
  ],
};

const servicesList = [
  {
    title: "Веб-разработка под ключ",
    desc: "Создаем высокопроизводительные сайты и приложения с использованием современных технологий.",
  },
  {
    title: "UX/UI Дизайн",
    desc: "Проектируем интуитивно понятные и эстетичные интерфейсы, которые вдохновляют пользователей.",
  },
  {
    title: "Инди-игры и Геймдев",
    desc: "Разрабатываем увлекательные инди-игры и создаем высококачественные игровые ассеты.",
  },
  {
    title: "Брендинг и Фирменный стиль",
    desc: "Формируем уникальный визуальный язык для вашего бренда, который выделяет вас на рынке.",
  },
  {
    title: "OdinLab Production",
    desc: "Полный цикл видео-продакшена и продюсирования проектов с профессиональным подходом.",
  },
  {
    title: "SEO и Маркетинг",
    desc: "Продвигаем ваши проекты в топ поисковых систем и социальных сетей.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-6xl font-bold mb-4">Наши Услуги</h1>
          <p className="text-xl text-odin-muted max-w-3xl mb-16">
            OdinLab предлагает полный спектр услуг для воплощения ваших цифровых идей в жизнь.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div
                key={service.title}
                className="p-8 border"
                style={{
                  borderColor: "var(--text-color)",
                  borderRadius: "var(--border-radius)",
                  backgroundColor: "rgba(var(--bg-color), 0.05)",
                }}
              >
                <h3 className="text-2xl font-bold font-display mb-4">
                  {service.title}
                </h3>
                <p className="text-odin-muted">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Блок генератора стилей */}
        <StyleShowcase />
      </main>
      <Footer />
    </>
  );
}
