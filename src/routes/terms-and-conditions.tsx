import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/luxury/Navbar";
import { Footer } from "@/components/luxury/Footer";

export const Route = createFileRoute('/terms-and-conditions')({
  component: TermsAndConditions,
})

function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container-luxe pt-28 pb-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-serif font-bold">Terms & Conditions</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            These terms define your rights and responsibilities when using our website, browsing collections, and purchasing jewellery from Ashok Gold & Diamonds.
          </p>
        </header>

        <section className="mx-auto mt-14 max-w-4xl space-y-10">
          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Orders and Product Availability</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>All products are subject to stock availability and may be withdrawn or updated without prior notice.</li>
              <li>Product visuals may vary slightly from final handcrafted items due to lighting, finish, or display settings.</li>
              <li>Order acceptance is confirmed only after successful verification and payment confirmation.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Pricing and Payments</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Gold and diamond prices are market-linked and can change at any time before final billing.</li>
              <li>Applicable making charges, taxes, and additional service fees will be included at checkout or invoice stage.</li>
              <li>Customers must provide accurate billing and contact details to avoid delays or cancellation.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Legal and Usage Conditions</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Content, designs, and branding on this website are owned by Ashok Gold & Diamonds and must not be reused without permission.</li>
              <li>Any misuse of the website, including fraudulent transactions, may result in blocked access and legal action.</li>
              <li>All disputes are subject to the jurisdiction of courts in Kerala, India.</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
