"use client";

"use client";

import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactForm from "./ContactForm";

const infoCards = [
  {
    title: "Office Address",
    body: ["Madhapur, Hyderabad", "India - 500081"],
    icon: FiMapPin,
  },
  {
    title: "Phone Numbers",
    body: [" +91 8341174141"],
    icon: FiPhone,
  },
  {
    title: "Email Addresses",
    body: ["info@gauvaron.com"],
    icon: FiMail,
  },
  {
    title: "Business Hours",
    body: ["Mon-Fri: 9:00 AM – 7:00 PM"],
    icon: FiClock,
  },
];

type ContactDetails = {
  email: string;
};

type ContactSectionProps = {
  contact: ContactDetails;
};

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" className="mx-auto flex max-w-6xl flex-col gap-10">
       <p className="text-3xl text-center uppercase  text-[#237B80]">Contact</p>
      <div className="space-y-2">
       
        <h3 className="text-3xl font-semibold text-slate-900">Get in Touch</h3>
        <p className="max-w-2xl text-md text-slate-600">
          Whether you have a project brief or want to explore partnership models, our team is ready to respond
          personally.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {infoCards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#237B80] to-[#2DD7D1] text-white">
                <card.icon size={22} />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">{card.title}</h4>
              <div className="mt-3 space-y-1 text-md text-slate-600">
                {card.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(15,15,15,0.08)]">
          <h4 className="pb-4 text-xl font-semibold text-slate-900">Send us a Message</h4>
          <ContactForm email={contact.email} />
        </div>
      </div>
    </section>
  );
}
