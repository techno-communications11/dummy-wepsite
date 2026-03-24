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
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setStatus("Sending your message...");

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: senderEmail,
          subject,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to send your message.");
      }

      setStatus("Thanks! We'll get back to you soon.");
      setName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error
          ? error.message
          : "Failed to send the message. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-md text-slate-900 focus:border-[#237B80] focus:outline-none";

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
          placeholder="Tell us how we can help you..."
          required
        />
      </label>
      <div className="space-y-1 text-xs uppercase text-slate-500">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#237B80] to-[#2DD7D1] px-6 py-3 text-[13px] font-semibold  text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
        <p
          className="text-center text-[13px] uppercase text-slate-400"
          role="status"
          aria-live="polite"
        >
          {status || `This message will be sent to ${email}`}
        </p>
      </div>
    </form>
  );
}
