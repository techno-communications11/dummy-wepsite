"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  email: string;
};

export default function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailSubject = subject || "Inquiry from the website";
    const body = [
      `Name: ${name || "—"}`,
      `Email: ${senderEmail || "—"}`,
      `Subject: ${subject || "—"}`,
      "",
      message || "No message provided.",
    ].join("\n");

    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", email);
    gmailUrl.searchParams.set("su", mailSubject);
    gmailUrl.searchParams.set("body", body);

    setStatus("Opening Gmail compose…");
    window.open(gmailUrl.toString(), "_blank");
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-md text-slate-900 focus:border-emerald-400 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-md font-semibold text-slate-900">
        Full Name *
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
          placeholder="Your full name"
          required
        />
      </label>
      <label className="text-md font-semibold text-slate-900">
        Email Address *
        <input
          type="email"
          value={senderEmail}
          onChange={(event) => setSenderEmail(event.target.value)}
          className={inputClass}
          placeholder="your.email@example.com"
          required
        />
      </label>
      <label className="text-md font-semibold text-slate-900">
        Subject *
        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={inputClass}
          placeholder="What is this regarding?"
          required
        />
      </label>
      <label className="text-md font-semibold text-slate-900">
        Message *
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClass} h-36 resize-none`}
          placeholder="Tell us how we can help you…"
          required
        />
      </label>
      <div className="space-y-1 text-xs uppercase  text-slate-500">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-3 text-[13px] font-semibold uppercase  text-white transition hover:opacity-90"
        >
          Send Message
        </button>
        <p className="text-center text-[13px] uppercase  text-slate-400">
          This message will be sent to {email}
        </p>
      </div>
    </form>
  );
}
