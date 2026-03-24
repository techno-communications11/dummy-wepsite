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

## PHP deployment (Hostinger-friendly)

Run `npm run build && npm run export`, then upload the contents of `out/` through Hostinger’s File Manager; the HTML, `_next`, and everything from `public/` (including `contact.php`, `careers.php`, and `.env.example`) go directly into the hosting directory and work without Node.js.

1. Copy `public/.env.example` to `.env` inside the exported folder, edit the Zoho SMTP values (host `smtp.zoho.in`, port `465`, `SMTP_SECURE=ssl`, `SMTP_USER` = your Zoho account, `SMTP_PASS` = the Zoho app password) along with `SMTP_RECIPIENT`/`SMTP_CAREERS_RECIPIENT`, and keep the resulting `.env` private (do not commit it).
2. Make sure the exported `contact.php` and `careers.php` remain beside the HTML so they can read `php://input`, validate the fields, and relay the message through Zoho SMTP; they already respond with JSON that the UI expects.
3. Upload the folder to Hostinger (the PHP files alongside `index.html`/`careers/index.html`), then point your domain at it. The exported forms post to `/contact.php` and `/careers.php`, so everything works via PHP with no `/api/` routes needed.

To test locally, run `php -S localhost:8000 -t out/` after exporting and target `http://localhost:8000/contact.php`/`careers.php` from your UI (use a proxy if needed). Otherwise simply deploy the exported files with the configured `.env` and you’re done.
