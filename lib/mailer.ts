import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function ensureTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing Gmail SMTP credentials (GMAIL_SMTP_USER / GMAIL_SMTP_PASS)."
    );
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
