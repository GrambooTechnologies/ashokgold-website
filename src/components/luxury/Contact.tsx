import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { SectionHeader } from "./SectionHeader";

function FloatingInput({
  label,
  type = "text",
  textarea = false,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [v, setV] = useState("");
  const id = label.toLowerCase().replace(/\s/g, "-");
  const Cmp: any = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Cmp
        id={id}
        type={type}
        value={v}
        onChange={(e: any) => setV(e.target.value)}
        rows={textarea ? 4 : undefined}
        placeholder=" "
        className="peer w-full rounded-xl border border-gold/20 bg-background/40 px-4 pt-6 pb-2 text-foreground placeholder-transparent focus:outline-none focus:border-gold transition-colors resize-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.25em] text-gold/80 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.25em] peer-focus:text-gold"
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Visit Us"
          title={<>Begin your <em className="not-italic text-gradient-gold">story</em></>}
          subtitle="Step into our showroom or send us a note — we'd love to help you find the piece that's meant to be yours."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, label: "Showroom", value: "ASHOK GOLD, Brahmamangalam, Kerala 686605", href: "https://share.google/tZGIjGfZRBOdqygxl" },
              { icon: Mail, label: "Email", value: "ashokgoldanddiamonds@gmail.com", href: "mailto:ashokgoldanddiamonds@gmail.com" },
              { icon: InstagramIcon, label: "Instagram", value: "@ashokgoldanddiamonds", href: "https://instagram.com/ashokgoldanddiamonds" },
              { icon: Phone, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919746755852" },
            ].map((c) => (
              <motion.a
                key={c.label}
                href={c.href || "#"}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 hover-gold-glow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 text-gold">
                  <c.icon size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    {c.label}
                  </div>
                  <div className="mt-0.5 text-foreground">{c.value}</div>
                </div>
              </motion.a>
            ))}

            <div className="overflow-hidden rounded-2xl border border-gold/15 mt-2">
              <iframe
                title="ASHOK GOLD location"
                src="https://www.google.com/maps?q=Ashok%20Gold%20%26%20Diamonds%2C%20Brahmamangalam%2C%20Kerala%20686605&output=embed"
                className="h-64 w-full grayscale contrast-110"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — we'll be in touch shortly.");
            }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 md:p-10 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput label="Your Name" />
              <FloatingInput label="Email" type="email" />
            </div>
            <FloatingInput label="Phone" type="tel" />
            <FloatingInput label="Tell us what you're looking for" textarea />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground gradient-gold shadow-gold hover:shadow-gold-lg transition-all duration-500"
            >
              Send Enquiry
            </button>
            <p className="text-center text-xs text-muted-foreground">
              We respond within one business day.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
