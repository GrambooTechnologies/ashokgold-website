import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-full gradient-gold transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

export function WhatsAppButton() {
  const whatsappDigits = "+91 9746755852".replace(/[^\d]/g, "")

  return (
    <motion.a
      href={`https://wa.me/${whatsappDigits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full gradient-gold text-primary-foreground shadow-gold-lg hover:scale-110 transition-transform"
    >
      <MessageCircle size={22} />
      <span className="absolute inset-0 rounded-full animate-ping bg-gold/30" />
    </motion.a>
  );
}
