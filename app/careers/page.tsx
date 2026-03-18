"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Footer
 from "../components/Footer";

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
  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-md text-slate-900 focus:border-emerald-400 focus:outline-none";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = role ? `Career interest: ${role}` : "Career interest";
    const body = [
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      `Role: ${role || "—"}`,
      `Message: ${message || "—"}`,
      `Resume/Portfolio link: ${driveLink || "—"}`,
    ].join("\n");

    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", "info@gauvaron.com");
    gmailUrl.searchParams.set("su", subject);
    gmailUrl.searchParams.set("body", body);

    setStatus("Opening Gmail compose…");
    window.open(gmailUrl.toString(), "_blank");
  };

  return (
    <div className="bg-white text-slate-900">
      <Navbar links={navLinks} />

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 lg:py-16">
        <section className="grid gap-8  bg-white p-10  lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <h1 className="text-3xl text-bolder  text-emerald-500">Careers</h1>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
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
            <Image
              src={heroImage}
              alt="Leadership team"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="grid gap-10  bg-white p-10  lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-slate-900">Why Join GAUVARON CORPORATE SOLUTIONS?</h2>
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
            <Image
              src={teamworkImage}
              alt="Team collaborating"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className=" bg-white p-10 ">
          <h2 className="text-3xl font-semibold text-slate-900">Submit your interest</h2>
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
            <div className="space-y-1 text-xs uppercase tracking-[0.4em] text-slate-500">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#d958ff] to-[#ff0080] px-6 py-3 text-[15px] font-semibold text-white transition hover:opacity-90"
              >
                Send Message 
              </button>
              {status && <p className="text-center text-[11px] text-slate-400">{status}</p>}
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
