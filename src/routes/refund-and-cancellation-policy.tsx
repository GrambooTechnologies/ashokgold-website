import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/luxury/Navbar";
import { Footer } from "@/components/luxury/Footer";

export const Route = createFileRoute('/refund-and-cancellation-policy')({
  component: RefundPolicy,
})

function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container-luxe pt-28 pb-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-serif font-bold">Refund Policy</h1>
          <nav aria-label="Breadcrumb" className="mt-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Refund Policy</span>
          </nav>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We aim to keep every purchase transparent and fair. Please review the sections below for return eligibility, refund timelines, and exceptions.
          </p>
        </header>

        <section className="mx-auto mt-14 max-w-4xl space-y-10">
          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Return Eligibility</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Products may be considered for return within 7 days from the date of purchase, subject to inspection.</li>
              <li>Original invoice, product tag, and all associated certificates must be submitted with the return request.</li>
              <li>Returned items should be in their original condition without signs of damage or alteration.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Refund Process and Timeline</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Approved refunds are processed after quality and eligibility checks at our store or authorized center.</li>
              <li>Refunds are typically completed within 10 working days after final approval.</li>
              <li>Payment is issued via account payee or crossed cheque in the registered customer name.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Non-Refundable Cases</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Customized, engraved, resized, or made-to-order jewellery is not eligible for refund.</li>
              <li>Products with missing certificates, tampered tags, or visible usage marks may be rejected.</li>
              <li>Service charges, making charges, and taxes may be non-refundable as per applicable billing rules.</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
