import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function ensureTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  const user = process.env.MAIL_SMTP_USER ?? process.env.GMAIL_SMTP_USER;
  const pass = process.env.MAIL_SMTP_PASS ?? process.env.GMAIL_SMTP_PASS;
  const host = process.env.MAIL_SMTP_HOST ?? "smtppro.zoho.in";
  const port = Number(process.env.MAIL_SMTP_PORT ?? "465");
  const secure =
    typeof process.env.MAIL_SMTP_SECURE !== "undefined"
      ? process.env.MAIL_SMTP_SECURE === "true"
      : port === 465;

  if (!user || !pass) {
    throw new Error(
      "Missing SMTP credentials (MAIL_SMTP_USER / MAIL_SMTP_PASS or GMAIL_SMTP_USER / GMAIL_SMTP_PASS)."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}
