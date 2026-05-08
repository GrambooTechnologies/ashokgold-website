import { motion } from "framer-motion";
import { Coins, TrendingUp, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const plans = [
  {
    icon: Coins,
    name: "Fixed Monthly Gold",
    tagline: "11 months pay — 12th month buy",
    highlights: [
      "Save a fixed amount every month for 11 months",
      "12th month: purchase jewellery at full scheme value",
      "Zero making charge on standard gold jewellery",
    ],
  },
  {
    icon: TrendingUp,
    name: "Variable Gold Scheme",
    tagline: "Pay any amount, accumulate at daily rate",
    highlights: [
      "Minimum monthly payment of just ₹500",
      "Gold credited at the prevailing daily rate",
      "Perfect for flexible, long-term gold saving",
    ],
  },
];

export function SchemesPreview() {
  return (
    <section id="schemes-preview" className="relative py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Gold Saving Schemes"
          title={
            <>
              Grow Your Gold,{" "}
              <em className="not-italic text-gradient-gold">Month by Month</em>
            </>
          }
          subtitle="Two flexible plans designed so every family can own the jewellery they dream of."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-7">
          {plans.map(({ icon: Icon, name, tagline, highlights }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="glass-strong rounded-3xl p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-13 w-13 place-items-center rounded-2xl gradient-gold shadow-gold shrink-0">
                  <Icon className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground">{name}</h3>
                  <p className="text-xs text-gold/80 mt-0.5">{tagline}</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold/70 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-md">
            View full scheme details, use our savings calculator, and enrol directly via WhatsApp.
          </p>
          <a
            href="/scheme"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white shadow-gold transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #AA6200 0%, #DDA045 50%, #AA6200 100%)" }}
          >
            Explore Schemes
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
