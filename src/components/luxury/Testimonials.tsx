import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const t = [
  { name: "Anjali Menon", role: "Bride · 2024", text: "My bridal set was beyond perfect. The craftsmanship and attention to every detail made our day unforgettable." },
  { name: "Rahul Krishnan", role: "Scheme Member", text: "The gold scheme made buying my mother's anniversary necklace effortless. Trustworthy, transparent and so elegant." },
  { name: "Priya Suresh", role: "Patron", text: "ASHOK's antique nagas collection is unmatched. Each piece feels like an heirloom in the making." },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeader eyebrow="Voices" title={<>Loved by our <em className="not-italic text-gradient-gold">patrons</em></>} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass rounded-2xl p-7 relative"
            >
              <Quote className="text-gold/60 mb-4" />
              <blockquote className="font-serif text-lg leading-relaxed text-foreground/90">
                "{item.text}"
              </blockquote>
              <figcaption className="mt-6 border-t border-gold/15 pt-4">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                  {item.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
