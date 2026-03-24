import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GAUVARON CORPORATE SOLUTIONS",
  description:
    "How GAUVARON CORPORATE SOLUTIONS collects, uses, and protects visitor data.",
};

const policySections = [
  {
    heading: "Information we collect",
    body: [
      "When you engage with our site and contact forms, we collect the data you voluntarily provide—name, email, role interest, message, and any file/drive links you submit.",
      "We also capture technical details such as browser, device, IP, and referring URL to evaluate performance and detect misuse.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "Form submissions are routed through our secured Zoho mailbox so our team can respond, qualify opportunities, and coordinate follow-ups.",
      "We may use aggregated, anonymized analytics to improve the experience, troubleshoot issues, and plan resources.",
      "We never sell or rent your personal data. We only share it with trusted vendors when required to answer your request (for example, our form processor or cloud provider), and we require those vendors to protect it.",
    ],
  },
  {
    heading: "Security and retention",
    body: [
      "We protect form data with TLS in transit, use secure credentials for our SMTP provider, and limit access to the smallest practical team. Credentials are stored in environment variables and rotated whenever there is a staffing change.",
      "Submissions are retained only as long as necessary to keep a record of the conversation or fulfill legal obligations. If you need us to erase your data sooner, contact us at info@gauvaron.com.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You may ask to review, update, or delete your personal data by emailing info@gauvaron.com with the subject “Privacy request”.",
      "You can opt out of marketing updates by replying “unsubscribe” to any non-transactional email, and we will honor it promptly.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Our pages may include links to partners, social media, or resources we believe are valuable. We are not responsible for their privacy practices, so please review each site’s policy before sharing data.",
    ],
  },
  {
    heading: "Policy changes",
    body: [
      "We may revise this policy from time to time; the effective date is at the top of this page. If a change materially affects you, we will highlight it on the home page or, if you previously contacted us, via email.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300">
            This policy explains how GAUVARON CORPORATE SOLUTIONS collects,
            stores, and uses data when you visit the site or email us. We aim for
            full transparency and control for every visitor.
          </p>
        </div>

        <div className="space-y-10">
          {policySections.map((section) => (
            <section key={section.heading} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40">
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

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#2D9EA4] to-[#2DD7D1] p-6 text-slate-950 shadow-xl shadow-slate-900/40">
          <h2 className="text-2xl font-semibold">Questions?</h2>
          <p className="mt-2 text-base">
            Reach out at <a className="font-semibold text-slate-900 underline" href="mailto:info@gauvaron.com">info@gauvaron.com</a> and we’ll walk you through any detail.
          </p>
        </div>
      </div>
    </div>
  );
}
