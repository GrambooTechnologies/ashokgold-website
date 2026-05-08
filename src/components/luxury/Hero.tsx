import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-jewellery.jpg";
import { GoldParticles } from "./Particles";

const reveal: any = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury diamond and gold necklace floating in dramatic light"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
      </div>

      <GoldParticles count={40} />

      {/* slow rotating gold ring decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow h-[80vmin] w-[80vmin] rounded-full border border-gold/10" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="animate-spin-slow h-[60vmin] w-[60vmin] rounded-full border border-gold/15"
          style={{ animationDirection: "reverse", animationDuration: "45s" }}
        />
      </div>

      <div className="container-luxe relative z-10 text-center">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={0}
          className="mx-auto mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white"
        >
          <span className="h-1 w-1 rounded-full bg-gold" />
          Established 2018 · Kerala
        </motion.div>

        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-[#1C1208]"
        >
          Crafting <em className="not-italic text-gradient-gold">Timeless</em>
          <br />
          Elegance
        </motion.h1>

        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-[#3A2A0F] leading-relaxed"
        >
          Heirloom craftsmanship meets contemporary luxury. Discover jewellery
          designed to be remembered for generations.
        </motion.p>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#collections"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#AA6200] bg-gradient-to-r from-[#AA6200] to-[#DDA045] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:brightness-105 hover:scale-[1.02]"
          >
            <span className="relative z-10">Explore Collections</span>
          </a>
          <a
            href="/scheme#join-scheme-form"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#AA6200] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#AA6200] transition-all duration-500 hover:bg-[#AA6200]/10 hover:scale-[1.02]"
          >
            Join Gold Scheme
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/70 hover:text-gold transition-colors"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
