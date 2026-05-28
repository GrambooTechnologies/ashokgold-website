import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/luxury/Navbar";
import { Footer } from "@/components/luxury/Footer";

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container-luxe pt-28 pb-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-serif font-bold">Privacy Policy</h1>
          <nav aria-label="Breadcrumb" className="mt-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Privacy Policy</span>
          </nav>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Ashok Gold respects your privacy and treats your personal information confidentially, with strong standards for safe and secure customer interactions.
          </p>
        </header>

        <section className="mx-auto mt-14 max-w-4xl space-y-10">
          <article className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This Privacy Policy may be updated from time to time based on legal, operational, or business requirements. We encourage you to review this page periodically to stay informed.
            </p>
            <p>
              We may collect personal details such as name, email address, contact number, and account-related information during account creation, order placement, and customer support interactions.
            </p>
            <p>
              Registered customer information may be used to provide order-related communication, service updates, and relevant offers aligned with previous preferences and purchase history.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Use of Information</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We use your personal information to facilitate service requests, order processing, customer support, and communication about products and offers. Technical information such as IP address and browsing behavior may be used for analytics, troubleshooting, and platform security.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Third-Party Links and Consent</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our website may include links to external websites or applications. Once you leave our platform, their privacy practices apply independently. By continuing to use our website and services, you acknowledge and agree to this policy and any lawful updates made to it.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Security Precautions</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>We maintain administrative and technical safeguards to prevent unauthorized access, misuse, or alteration of personal information.</li>
              <li>Access to customer data is restricted to authorized personnel with role-based controls and internal confidentiality standards.</li>
              <li>Where required, secure channels and controlled systems are used for account and transaction-related processes.</li>
              <li>For privacy requests, updates, or consent withdrawal, customers may contact us through our official support channels.</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  )
}
