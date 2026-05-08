import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/scheme", label: "Gold Schemes" },
  { href: "/#why", label: "Why Us" },
];

const allLinks = [...links, { href: "/#contact", label: "Contact" }];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-luxe flex items-center">
          <a href="/" className="group flex items-center gap-2.5">
            <img
              src={logo}
              alt="ASHOK GOLD & DIAMONDS"
              className="h-9.5 w-auto object-contain grayscale contrast-125 brightness-40"
            />
            <div className="leading-none">
              <div className="font-serif text-xl sm:text-3xl tracking-[0.1em] text-[#1C1208]">
                ASHOK
              </div>
              <div className="text-[9.5px] leading-none uppercase tracking-[0.14em] text-[#4b2e00]">
                Gold &amp; Diamonds
              </div>
            </div>
          </a>

          <nav className="ml-auto hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm uppercase tracking-[0.2em] text-[#1C1208] hover:text-[#AA6200] transition-colors"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <a
              href="/#contact"
              className="hidden lg:inline-flex items-center rounded-full border border-[#AA6200] px-5 py-1.5 text-sm uppercase tracking-[0.2em] text-[#AA6200] transition-colors hover:bg-[#AA6200] hover:text-white"
            >
              Contact
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-[#AA6200] text-[#1C1208]"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F4EDD6]/97 backdrop-blur-2xl"
          >
            <div className="container-luxe flex items-center justify-between py-5">
              <span className="font-serif text-xl text-[#1C1208]">ASHOK</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#AA6200] text-[#1C1208]"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="container-luxe mt-16 flex flex-col gap-8">
              {allLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="font-serif text-4xl text-[#1C1208] hover:text-[#AA6200] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
