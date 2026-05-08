import { motion } from "framer-motion";
import { ShieldCheck, Gem, Sparkles, BadgeIndianRupee, Crown, Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const items = [
  { icon: ShieldCheck, title: "Trusted Purity", text: "BIS hallmarked gold and certified diamonds in every piece." },
  { icon: Gem, title: "Premium Craftsmanship", text: "Hand-finished by master artisans with decades of expertise." },
  { icon: Sparkles, title: "Modern & Traditional", text: "From temple antiques to contemporary couture — designed for you." },
  { icon: BadgeIndianRupee, title: "Transparent Pricing", text: "Clear, fair pricing with daily updated gold rates." },
  { icon: Crown, title: "Elegant Collections", text: "Curated bridal, daily wear and luxury collections." },
  { icon: Award, title: "Trusted Since 2018", text: "A name built on craftsmanship, quality and customer trust." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-28 md:py-40">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Why ASHOK"
          title={
            <>
              Six promises, <em className="not-italic text-gradient-gold">one standard</em>
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/40 p-7 hover-gold-glow"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-500">
                  <it.icon size={20} />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {it.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
