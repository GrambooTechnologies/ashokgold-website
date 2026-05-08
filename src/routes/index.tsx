import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/luxury/Navbar";
import { Hero } from "@/components/luxury/Hero";
import { About } from "@/components/luxury/About";
import { Collections } from "@/components/luxury/Collections";
import { WhyUs } from "@/components/luxury/WhyUs";
import { SchemesPreview } from "@/components/luxury/SchemesPreview";
import { Testimonials } from "@/components/luxury/Testimonials";
import { Faq } from "@/components/luxury/Faq";
import { Contact } from "@/components/luxury/Contact";
import { Footer } from "@/components/luxury/Footer";
import { ScrollProgress, WhatsAppButton } from "@/components/luxury/Floating";
import { PremiumLoader } from "@/components/luxury/Loader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASHOK GOLD & DIAMONDS — Crafting Timeless Elegance" },
      {
        name: "description",
        content:
          "Premium gold, diamond, platinum and silver jewellery from Kerala. Bridal collections, antique nagas, and flexible gold saving schemes since 2018.",
      },
      { property: "og:title", content: "ASHOK GOLD & DIAMONDS — Timeless Luxury" },
      {
        property: "og:description",
        content:
          "Discover heirloom craftsmanship in gold, diamond and platinum. Join our gold saving schemes and own jewellery designed to be remembered.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PremiumLoader />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Collections />
      <SchemesPreview />
      <WhyUs />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
