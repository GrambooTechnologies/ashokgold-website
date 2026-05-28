import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import craftImg from "@/assets/craftsmanship.jpg";
import { SectionHeader } from "./SectionHeader";

// timeline removed per request

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl text-gradient-gold">
      {val}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Our Heritage"
          title={
            <>
              Legacy of <em className="not-italic text-gradient-gold">Craftsmanship</em>
            </>
          }
          subtitle="ASHOK GOLD began as a jewellery manufacturing house dedicated to purity and craftsmanship. Since 2018, we've evolved into a premium destination for traditional and modern jewellery — delivered with unmatched quality and trust."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group mt-20 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-4 rounded-3xl gradient-gold opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-elegant">
            <img
              src={craftImg}
              alt="Master goldsmith handcrafting a gold pendant"
              width={1280}
              height={1024}
              loading="lazy"
              className="w-full h-[420px] md:h-[520px] object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-xl text-gradient-gold">
                Hand-finished in Kerala
              </p>
              <p className="text-sm text-muted-foreground">
                Every piece touched by master artisans.
              </p>
            </div>
          </div>
        </motion.div>

        {/* stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 glass-strong rounded-2xl p-8 md:p-12">
          {[
            { v: 7, s: "+", l: "Years of Trust" },
            { v: 10, s: "K+", l: "Happy Customers" },
            { v: 500, s: "+", l: "Unique Designs" },
            { v: 100, s: "%", l: "Hallmarked Purity" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <Counter to={s.v} suffix={s.s} />
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
