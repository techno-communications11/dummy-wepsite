import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const DEFAULT_RECIPIENT = "info@gauvaron.com";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

let transporter: nodemailer.Transporter | null = null;

function ensureTransporter() {
  if (transporter) {
    return transporter;
  }

  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing Gmail SMTP credentials (GMAIL_SMTP_USER / GMAIL_SMTP_PASS).");
  }

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export async function POST(request: NextRequest) {
  try {
    const rawPayload = (await request.json()) as Partial<ContactPayload>;
    const trimmedPayload = {
      name: (rawPayload.name ?? "").trim(),
      email: (rawPayload.email ?? "").trim(),
      subject: (rawPayload.subject ?? "").trim(),
      message: (rawPayload.message ?? "").trim(),
    };

    if (
      !trimmedPayload.name ||
      !trimmedPayload.email ||
      !trimmedPayload.subject ||
      !trimmedPayload.message
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const mailer = ensureTransporter();
    const recipient = process.env.CONTACT_RECIPIENT ?? DEFAULT_RECIPIENT;

    await mailer.sendMail({
      from: `"Gauvaron Website" <${process.env.GMAIL_SMTP_USER}>`,
      to: recipient,
      replyTo: trimmedPayload.email,
      subject: `[Website Inquiry] ${trimmedPayload.subject}`,
      text: [
        `Name: ${trimmedPayload.name}`,
        `Email: ${trimmedPayload.email}`,
        "",
        trimmedPayload.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to send the message right now.";

    return NextResponse.json(
      { error: message },
      { status: message === "All fields are required." ? 400 : 500 }
    );
  }
}
