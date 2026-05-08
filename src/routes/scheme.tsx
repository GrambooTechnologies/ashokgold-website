import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/luxury/Navbar";
import { Schemes } from "@/components/luxury/Schemes";
import { Footer } from "@/components/luxury/Footer";
import { ScrollProgress, WhatsAppButton } from "@/components/luxury/Floating";

export const Route = createFileRoute("/scheme")({
  head: () => ({
    meta: [
      { title: "Gold Schemes | ASHOK GOLD & DIAMONDS" },
      {
        name: "description",
        content:
          "Explore ASHOK GOLD & DIAMONDS Scheme 1 and Scheme 2, then join instantly via WhatsApp form.",
      },
    ],
  }),
  component: SchemePage,
});

function SchemePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Schemes />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
