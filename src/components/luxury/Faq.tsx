import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  { q: "How does the Fixed Monthly Gold Scheme work?", a: "Choose a fixed monthly amount (e.g. ₹2,000) and pay it for 11 months. In the 12th month you can purchase jewellery worth the total scheme value, with zero making charges on standard gold jewellery and 5% making charge discount on premium pieces." },
  { q: "What happens if I miss a monthly payment?", a: "You may miss one monthly installment without losing benefits. If two or more payments are skipped, scheme benefits are cancelled." },
  { q: "How is the Flexible Gold Investment different?", a: "There's no fixed amount — pay any amount above ₹500 each month. Your money is converted to gold at the live daily rate and credited to your gold account, perfect for accumulating gold over time." },
  { q: "Is your gold BIS hallmarked?", a: "Yes — every gold piece we sell is BIS hallmarked, and our diamonds are independently certified." },
  { q: "Can I visit the showroom?", a: "Absolutely. Visit us at Brahmamangalam, Kerala 686605. We'd love to walk you through our collections in person." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe max-w-4xl">
        <SectionHeader eyebrow="Questions" title={<>Frequently <em className="not-italic text-gradient-gold">asked</em></>} />
        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border transition-all duration-500 ${
                  isOpen ? "border-gold/40 bg-card/60" : "border-gold/10 bg-card/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="font-serif text-lg md:text-xl">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold shrink-0"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
