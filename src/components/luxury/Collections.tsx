import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import bridal from "@/assets/collection-bridal.jpg";
import diamond from "@/assets/collection-diamond.jpg";
import antique from "@/assets/collection-antique.jpg";
import daily from "@/assets/collection-daily.jpg";

const items = [
  { title: "Bridal", tag: "Signature", img: bridal, span: "lg:col-span-2 lg:row-span-2" },
  { title: "Diamond", tag: "Brilliance", img: diamond, span: "" },
  { title: "Antique", tag: "Heritage", img: antique, span: "" },
  { title: "Daily Wear", tag: "Everyday Luxe", img: daily, span: "lg:col-span-2" },
];

const tags = ["Gold", "Diamond", "Platinum", "Silver", "Antique", "Nagas", "Bridal", "Daily Wear", "Luxury"];

export function Collections() {
  return (
    <section id="collections" className="relative py-28 md:py-40 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Curated Collections"
          title={
            <>
              The <em className="not-italic text-gradient-gold">Atelier</em>
            </>
          }
          subtitle="From bridal heirlooms to everyday elegance — explore collections crafted in 18K, 22K and 24K gold, certified diamonds, platinum and silver."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-gold/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5 lg:gap-6 lg:auto-rows-[280px]">
          {items.map((it, i) => (
            <motion.a
              key={it.title}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-gold/10 hover-gold-glow ${it.span}`}
            >
              <img
                src={it.img}
                alt={`${it.title} jewellery collection`}
                loading="lazy"
                className="h-full w-full min-h-[280px] object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  {it.tag}
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <h3 className="font-serif text-2xl md:text-3xl text-gradient-gold">
                    {it.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.25em] text-foreground/70 group-hover:text-gold transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
              {/* glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
