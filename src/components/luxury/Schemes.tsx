import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Coins, TrendingUp, Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const WHATSAPP_PHONE = "919746755852";

function FixedCalculator() {
  const [amount, setAmount] = useState(2000);
  const total = amount * 11;
  return (
    <div className="glass rounded-2xl p-6 mt-6">
      <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-3">
        Calculator
      </div>
      <label className="block text-sm text-muted-foreground mb-2">
        Monthly amount: <span className="text-gold font-medium">₹{amount.toLocaleString()}</span>
      </label>
      <input
        type="range"
        min={1000}
        max={25000}
        step={500}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full accent-[var(--gold)]"
      />
      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Jewellery worth (12th month)
        </span>
        <span className="font-serif text-3xl text-gradient-gold">
          ₹{total.toLocaleString()}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full bg-gold/80"
            style={{ opacity: 0.3 + (i / 11) * 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}

function VariableCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10000);
  const grams = useMemo(() => (amount / rate).toFixed(2), [amount, rate]);
  return (
    <div className="glass rounded-2xl p-6 mt-6">
      <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">
        Live Conversion
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">You pay (₹)</label>
          <input
            type="number"
            value={amount}
            min={500}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-gold/20 bg-background/40 px-3 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Gold rate / g (₹)</label>
          <input
            type="number"
            value={rate}
            min={1000}
            onChange={(e) => setRate(Number(e.target.value) || 1)}
            className="mt-1 w-full rounded-lg border border-gold/20 bg-background/40 px-3 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Gold credited
        </span>
        <span className="font-serif text-3xl text-gradient-gold">{grams} g</span>
      </div>
      {/* mini chart */}
      <div className="mt-5 flex items-end gap-1 h-14">
        {[40, 55, 48, 65, 72, 60, 78, 85, 80, 92, 88, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-gold/30 to-gold"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const features1 = [
  "Pay a fixed amount monthly for 11 months",
  "12th month: purchase jewellery worth full scheme value",
  "Zero making charge on standard gold jewellery",
  "5% making charge discount on premium jewellery",
];
const features2 = [
  "Minimum monthly payment of ₹500",
  "Pay any amount above ₹500 every month",
  "Gold credited at the prevailing daily rate",
  "Perfect for long-term gold accumulation",
];

export function Schemes() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("Fixed Monthly Gold");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [details, setDetails] = useState("");

  const onJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = [
      "Hello ASHOK GOLD & DIAMONDS, I want to join a gold scheme.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Scheme: ${selectedScheme}`,
      `Monthly Amount: ${monthlyAmount || "Not specified"}`,
      `Details: ${details || "Not specified"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="schemes" className="relative py-28 md:py-40">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Gold Saving Schemes"
          title={
            <>
              Invest in <em className="not-italic text-gradient-gold">Pure Gold</em>
            </>
          }
          subtitle="Two thoughtfully designed plans that let you save consistently and own jewellery you'll cherish."
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scheme 1 */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="relative glass-strong rounded-3xl p-8 md:p-10 hover-gold-glow"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold shadow-gold">
                <Coins className="text-primary-foreground" size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Scheme 01</div>
                <h3 className="font-serif text-2xl md:text-3xl">Fixed Monthly Gold</h3>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Choose a fixed amount and pay it for 11 months. On the 12th month,
              walk into the showroom and choose jewellery worth your entire
              scheme value — with making charge benefits.
            </p>
            <ul className="mt-6 space-y-3">
              {features1.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 shrink-0 text-gold" size={16} />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <FixedCalculator />
            <p className="mt-4 text-[11px] text-muted-foreground/80 italic">
              * Skipping 2 or more monthly payments cancels scheme benefits.
            </p>
          </motion.article>

          {/* Scheme 2 */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative glass-strong rounded-3xl p-8 md:p-10 hover-gold-glow"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold shadow-gold">
                <TrendingUp className="text-primary-foreground" size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Scheme 02</div>
                <h3 className="font-serif text-2xl md:text-3xl">Flexible Gold Investment</h3>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Pay any amount above ₹500 every month. We convert your payment to
              pure gold at the prevailing market rate and credit it to your
              gold account — accumulate at your own pace.
            </p>
            <ul className="mt-6 space-y-3">
              {features2.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 shrink-0 text-gold" size={16} />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <VariableCalculator />
          </motion.article>
        </div>

        <motion.div
          id="join-scheme-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-14 glass-strong rounded-3xl p-8 md:p-10"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="font-serif text-2xl md:text-3xl">
              Join Scheme via <span className="text-gradient-gold">WhatsApp</span>
            </h3>
            <p className="text-sm text-muted-foreground">Share your basic details and we will assist you quickly.</p>
          </div>

          <form onSubmit={onJoinSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full rounded-xl border border-gold/25 bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              className="w-full rounded-xl border border-gold/25 bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full rounded-xl border border-gold/25 bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
            >
              <option>Fixed Monthly Gold</option>
              <option>Flexible Gold Investment</option>
            </select>
            <input
              type="text"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              placeholder="Monthly Amount (example: 2000)"
              className="w-full rounded-xl border border-gold/25 bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Any basic details (preferred collection, best call time, etc.)"
              rows={4}
              className="md:col-span-2 w-full rounded-xl border border-gold/25 bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="md:col-span-2 inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.25em] text-foreground gradient-gold shadow-gold hover:shadow-gold-lg transition-all duration-500"
            >
              Send to WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
