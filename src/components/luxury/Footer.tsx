import { Mail, MapPin } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10">
      <div className="container-luxe">
        <div className="gold-divider mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="ASHOK GOLD & DIAMONDS"
                className="h-9.5 w-auto object-contain grayscale contrast-125 brightness-40"
              />
              <div className="leading-none">
                <div className="font-serif text-xl sm:text-3xl tracking-[0.1em] text-[#1C1208]">ASHOK</div>
                <div className="text-[9.5px] leading-none uppercase tracking-[0.14em] text-[#4b2e00]">
                  Gold &amp; Diamonds
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-muted-foreground leading-relaxed">
              A premium jewellery house from Kerala — crafting timeless gold,
              diamond, platinum and silver jewellery since 2018.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gradient-gold">Discover</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "About", href: "/#about" },
                { label: "Collections", href: "/#collections" },
                { label: "Gold Schemes", href: "/scheme" },
                { label: "Why Us", href: "/#why" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gradient-gold">Information</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Refund Policy", href: "/refund-and-cancellation-policy" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-serif text-lg mb-4 text-gradient-gold">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-gold shrink-0" />
                <span>Ashok Gold &amp; Diamonds, Brahmamangalam, Kerala 686605</span>
              </li>
              <li>
                <a href="mailto:ashokgoldanddiamonds@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Mail size={14} className="text-gold" /> ashokgoldanddiamonds@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/ashokgoldanddiamonds" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <InstagramIcon size={14} className="text-gold" /> @ashokgoldanddiamonds
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-16 mb-6" />
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ASHOK GOLD & DIAMONDS. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://gramboo.in/"
              target="_blank"
              rel="noreferrer"
              className="text-[#AA6200] hover:text-[#DDA045] transition-colors"
            >
              Gramboo Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
