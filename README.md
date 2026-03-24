This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email Configuration

The contact form posts to `app/api/contact/route.ts`, which sends submissions through whatever SMTP server you configure. Create a `.env.local` file (not committed) with the following keys and restart your dev server whenever the file changes:

```
MAIL_SMTP_HOST=smtp.zoho.in
MAIL_SMTP_PORT=465
MAIL_SMTP_SECURE=true
MAIL_SMTP_USER=your@zoho-domain.com
MAIL_SMTP_PASS=your-zoho-app-password
CONTACT_RECIPIENT=your@zoho-domain.com
```

For Zoho mailboxes, `MAIL_SMTP_HOST` should be `smtp.zoho.in` (or `smtp.zoho.com` if you're on the international plan) and port `465` with SSL enabled. Generate an **app password** under Zoho Mail → Security so you don’t reuse your main password. `CONTACT_RECIPIENT` controls where submissions land; using the same Zoho address keeps everything in one inbox. The code still falls back to the previous Gmail-focused env names (`GMAIL_SMTP_USER` / `GMAIL_SMTP_PASS`) if those are present.
