import { NextRequest, NextResponse } from "next/server";
import { ensureTransporter } from "@/lib/mailer";

export const runtime = "nodejs";

const DEFAULT_RECIPIENT = "info@gauvaron.com";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

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
    const senderAddress =
      process.env.MAIL_SMTP_USER ?? process.env.GMAIL_SMTP_USER ?? "";

    await mailer.sendMail({
      from: `"Gauvaron Website" <${senderAddress}>`,
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
