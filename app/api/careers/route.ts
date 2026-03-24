import { NextRequest, NextResponse } from "next/server";
import { ensureTransporter } from "@/lib/mailer";

export const runtime = "nodejs";

const DEFAULT_RECIPIENT = "info@gauvaron.com";

type CareerPayload = {
  name: string;
  email: string;
  role: string;
  message: string;
  driveLink: string;
};

export async function POST(request: NextRequest) {
  try {
    const rawPayload = (await request.json()) as Partial<CareerPayload>;
    const trimmedPayload = {
      name: (rawPayload.name ?? "").trim(),
      email: (rawPayload.email ?? "").trim(),
      role: (rawPayload.role ?? "").trim(),
      message: (rawPayload.message ?? "").trim(),
      driveLink: (rawPayload.driveLink ?? "").trim(),
    };

    if (
      !trimmedPayload.name ||
      !trimmedPayload.email ||
      !trimmedPayload.role ||
      !trimmedPayload.message ||
      !trimmedPayload.driveLink
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
      from: `"Gauvaron Careers" <${senderAddress}>`,
      to: recipient,
      replyTo: trimmedPayload.email,
      subject: `[Career Interest] ${trimmedPayload.role}`,
      text: [
        `Name: ${trimmedPayload.name}`,
        `Email: ${trimmedPayload.email}`,
        `Role: ${trimmedPayload.role}`,
        `Resume Link: ${trimmedPayload.driveLink}`,
        "",
        trimmedPayload.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career form submission failed:", error);

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
