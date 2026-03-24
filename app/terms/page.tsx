import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GAUVARON CORPORATE SOLUTIONS",
  description:
    "The terms that govern use of the GAUVARON CORPORATE SOLUTIONS website and communications.",
};

const termsSections = [
  {
    heading: "Agreement to act respectfully",
    body: [
      "By visiting gauvaron.com and using the contact/career forms, you agree to act in good faith and respect the people responding on our team.",
      "We reserve the right to refuse service or block submissions that appear abusive, deceptive, or violate our values.",
    ],
  },
  {
    heading: "What we provide",
    body: [
      "The site showcases our IT, HR, and BPO services, leadership, and thought pieces.",
      "Any guidance we share through blog posts, emails, or calls is for informational purposes and should not be construed as professional advice unless explicitly agreed upon.",
    ],
  },
  {
    heading: "Forms, data, and communications",
    body: [
      "Contact or career submissions should match the required fields; incomplete forms will be rejected and any sensitive data should be shared through secure channels.",
      "Submission content becomes part of our client-intake runbooks so we can deliver timely responses, and we may keep that data for as long as needed to provide service or comply with legal obligations.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content on this site—text, imagery, design—is owned by GAUVARON CORPORATE SOLUTIONS or its licensors.",
      "You may view or download copies for your internal evaluation only; you must not redistribute, modify, or republish the content without written permission.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "We do not guarantee that the site will be available without interruption or that the content is error-free.",
      "OUR SERVICES ARE PROVIDED “AS IS,” and our liability is limited to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Governing law & changes",
    body: [
      "These terms are governed by the laws of Telangana, India. If a court finds any provision unenforceable, the rest still applies.",
      "We may update these terms at any time; the new version is effective once posted. Check this page before submitting new requests.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-300">
            These terms describe how you may use our site and what happens
            after you connect with us through the form. Please read them before
            submitting any inquiry.
          </p>
        </div>

        <div className="space-y-10">
          {termsSections.map((section) => (
            <section
              key={section.heading}
              className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40"
            >
              <h2 className="text-2xl font-semibold text-white">
                {section.heading}
              </h2>
              <div className="space-y-2 text-slate-300">
                {section.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 not-prose text-slate-300">
          <p>
            Questions about these terms? Email us at{" "}
            <a
              className="font-semibold text-white underline"
              href="mailto:info@gauvaron.com"
            >
              info@gauvaron.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
