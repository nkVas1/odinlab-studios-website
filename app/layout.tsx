import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ErrorBoundary from "@/components/providers/ErrorBoundary";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

// Динамический рендер - нужен для Canvas/Three.js
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "OdinLab Studios | Инновационный Дизайн и Разработка",
    template: "%s | OdinLab Studios",
  },
  description:
    "Креативная студия полного цикла: веб-разработка, геймдев, продюсирование и дизайн. Создаем цифровое будущее уже сегодня.",
  keywords: [
    "веб-разработка",
    "дизайн",
    "геймдев",
    "маркетинг",
    "создание сайтов",
    "OdinLab",
    "3D графика",
  ],
  authors: [{ name: "Никита Василюк", url: "https://odinlab.studio" }],
  creator: "OdinLab Studios",
  metadataBase: new URL("https://odinlab.studio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://odinlab.studio",
    siteName: "OdinLab Studios",
    title: "OdinLab Studios | Инновационный Дизайн и Разработка",
    description:
      "Креативная студия полного цикла: веб-разработка, геймдев, продюсирование и дизайн.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OdinLab Studios Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OdinLab Studios",
    description: "Инновационный дизайн и разработка",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-odin-dark text-odin-text antialiased selection:bg-odin-gold selection:text-odin-dark">
        <ErrorBoundary>
          <SmoothScroll>
            <Cursor />
            <Header />
            <main className="relative z-10 flex min-h-screen flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ErrorBoundary>
      </body>
    </html>
  );
}
