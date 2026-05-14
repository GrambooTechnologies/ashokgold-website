import { createFileRoute } from '@tanstack/react-router'
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
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Your privacy is important to us. This policy explains what information we collect, how we use it, and the controls available to you.
          </p>
        </header>

        <section className="mx-auto mt-14 max-w-4xl space-y-10">
          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Information We Collect</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>We collect contact and transaction details when you place orders, request support, or join jewellery schemes.</li>
              <li>Technical data such as device type, browser details, and usage behavior may be collected to improve website performance.</li>
              <li>Only the minimum required information is requested for each service we provide.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">How We Use and Protect Data</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>Your information is used to process purchases, share order updates, and provide customer assistance.</li>
              <li>We use internal security controls and restricted access to protect stored personal information.</li>
              <li>We do not sell your personal information to third-party marketers.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif font-semibold text-foreground">Your Rights and Cookie Usage</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground leading-relaxed">
              <li>You may request access, correction, or deletion of your personal data, subject to legal and billing requirements.</li>
              <li>Marketing communications can be opted out of at any time through provided contact methods.</li>
              <li>Cookies are used to maintain session experience and analyze website activity for better service.</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  )
}
