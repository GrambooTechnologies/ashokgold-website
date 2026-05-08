import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function PremiumLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative h-24 w-24 rounded-full border border-gold/20 border-t-gold grid place-items-center"
            >
              <img src={logo} alt="ASHOK" className="h-12 w-auto object-contain" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 font-serif text-2xl text-gradient-gold tracking-[0.4em]"
            >
              ASHOK
            </motion.div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              Gold &amp; Diamonds
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
