import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Контакты | OdinLab Studios",
  description:
    "Свяжитесь с нами, чтобы обсудить ваш следующий проект. Мы всегда открыты для новых идей и сотрудничества.",
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
