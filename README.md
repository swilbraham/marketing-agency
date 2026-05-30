# Brightside

A website for a **Meta ads agency** (Facebook & Instagram) that helps small and
local businesses get more customers. Built with Next.js 16 (App Router),
TypeScript, and Tailwind CSS 4.

## Sections

- **Hero** with headline, CTAs, and headline stats
- **Services** — six Meta-focused cards (campaign management, creative, targeting, retargeting, landing pages, tracking)
- **Pricing** — four tiers (Starter £99 / Plus £299 / Growth £599 / Scale custom)
- **Testimonials** — social proof from local business owners
- **Contact** — lead form that posts to an API route, with success state

## Client landing-page template (`/lp`)

`app/lp/page.tsx` is a reusable, conversion-focused landing page you can hand to
clients (the "free landing page" offered on every pricing tier). All content is
driven by a single `config` object at the top of the file — to make a new one,
copy the `app/lp` folder to a new route and edit the business name, accent colour
(one hex), phone, offer, photos, and reviews. It's tuned for lead-generation /
local service businesses; the form posts to `/api/contact`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The contact form

The form posts to `app/api/contact/route.ts`, which validates the input and
currently **logs the enquiry to the server console**. To actually receive leads,
wire up an email or CRM provider in that file (look for the `TODO`). Good options:

- [Resend](https://resend.com) for transactional email
- A webhook to Zapier / Make
- Your CRM's inbound API

## Deploy to Vercel via GitHub

1. Create a new repository on GitHub.
2. Push this project:
   ```bash
   git add .
   git commit -m "Initial commit: Brightside marketing site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), import the repository, and
   click **Deploy**. Vercel auto-detects Next.js — no configuration needed.
4. (Optional) Add any environment variables (e.g. your email API key) in the
   Vercel project settings before deploying.

Every push to `main` will then redeploy automatically.

## Customising

- Brand name, colours, and copy live in `app/components/*` and `app/globals.css`
  (the `@theme` block defines the `brand-*` colours).
- Update the page `<title>` and description in `app/layout.tsx`.
