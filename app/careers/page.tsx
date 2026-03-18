"use client";

import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

const heroImage = "/office.webp";
const teamworkImage = "/enjoy.webp";

const perks = [
  {
    title: "Why join?",
    body: [
      "Collaborative leadership that listens to your ideas.",
      "Outcome-oriented goals with clear KPIs and recognition.",
      "Culture of transparency, safety, and growth.",
    ],
  },
  {
    title: "What we provide",
    body: [
      "Comprehensive learning budgets and certifications.",
      "Mentorship squads, wellness benefits, and hybrid work hours.",
      "Access to cutting-edge infrastructure, tooling, and automation.",
    ],
  },
];

export default function CareersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-md text-slate-900 focus:border-[#237B80] focus:outline-none";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending your application...");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          message,
          driveLink,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to send your application.");
      }

      setStatus("Thanks! We'll reply soon.");
      setName("");
      setEmail("");
      setRole("");
      setMessage("");
      setDriveLink("");
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error
          ? error.message
          : "Failed to send the message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900">
      <Navbar links={navLinks} />

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 lg:py-16">
        <section className="grid gap-8  bg-white p-10  lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-5">
          <h1 className="text-2xl text-bolder text-[#237B80] sm:text-3xl">Careers</h1>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Build with us and engineer the future of dependable technology services.
            </h1>
            <p className="text-lg text-slate-600">
              GAUVARON CORPORATE SOLUTIONS invites ambitious technologists, delivery leaders, and operations experts to
              join our journey. We move quickly, care deeply about people, and shape projects that matter across IT, BPO,
              and HR delivery.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl  bg-slate-50 p-5 text-md text-slate-600">
                <p className="text-xs uppercase  text-slate-500">Locations</p>
                <p className="text-lg font-semibold text-slate-900">Madhapur Hyderabad </p>
              </div>
              
            </div>
          </div>
          <div className="relative h-80 w-full overflow-hidden  bg-slate-50">
            <img
              src={heroImage}
              alt="Leadership team"
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="grid gap-10  bg-white p-10  lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Why Join GAUVARON CORPORATE SOLUTIONS?</h2>
            <p className="text-md text-slate-600">
              We operate with discipline and empathy so that every employee can grow, learn, and feel supported.
            </p>
            <div className="space-y-4">
              {perks.map((perk) => (
                <article key={perk.title} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{perk.title}</h3>
                  <ul className="list-disc pl-5 text-md text-slate-600">
                    {perk.body.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
            <img
              src={teamworkImage}
              alt="Team collaborating"
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className=" bg-white p-10 ">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Submit your interest</h2>
          <p className="mt-2 text-md text-slate-600">
            Please complete the form below and include a Google Drive link to your resume/portfolio since we don’t
            maintain an internal database yet. We’ll reply via email within a couple of business days.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="text-md font-semibold text-slate-900">
              Full Name *
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
                placeholder="Your name"
                required
              />
            </label>
            <label className="text-md font-semibold text-slate-900">
              Email Address *
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
                placeholder="name@example.com"
                required
              />
            </label>
            <label className="text-md font-semibold text-slate-900">
              Role you’re interested in *
              <input
                type="text"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className={fieldClass}
                placeholder="E.g., DevOps Engineer"
                required
              />
            </label>
            <label className="text-md font-semibold text-slate-900">
              Google Drive link (resume/portfolio) *
              <input
                type="url"
                value={driveLink}
                onChange={(event) => setDriveLink(event.target.value)}
                className={fieldClass}
                placeholder="https://drive.google.com/..."
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Make sure the link is set to “Anyone with the link can view.”
              </p>
            </label>
            <label className="text-md font-semibold text-slate-900">
              Tell us about yourself *
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${fieldClass} h-32 resize-none`}
                placeholder="Share a short note about why you’d like to join."
                required
              />
            </label>
            <div className="space-y-1 text-2xl uppercase  text-slate-500">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#237B80] to-[#2D9EA4] px-6 py-3 text-[15px] font-semibold text-white transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {status && (
                <p
                  className="text-center text-[11px] text-slate-400"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </p>
              )}
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
