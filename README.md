# T-sats Shop

Demo store at [t-sats.com](https://t-sats.com) for showing off Zaprite Pay. Shoppers buy a pretend t-shirt for $0.21 and
pay for real on Zaprite's hosted checkout. No cart, database, CMS or emails: just three products and the Zaprite API.

Built with Next.js (App Router), Tailwind CSS v4 and the Ubuntu font from Google Fonts, deployed on Vercel.

## How it works

1. **Storefront** (`src/app/page.tsx`): three shirts from `src/lib/products.ts`. **Buy Now** calls the `buyNow` server
   action (`src/app/actions.ts`), which creates a Zaprite order (`POST /v1/orders`, 21 cents USD, tagged `T-sats Shop`,
   expires in an hour) with a `redirectUrl` back to `/success`, then sends the shopper to the order's `checkoutUrl`.
2. **Zaprite checkout**: the shopper pays with Zaprite Pay, Lightning or whatever the checkout offers. Once the order is
   paid, Zaprite redirects to `/success?orderId=…`.
3. **Success** (`src/app/success/page.tsx`): a thank-you note with the paid order and links to Zaprite Pay, Zaprite P2P
   and Zaprite.

All Zaprite calls live in `src/lib/zaprite.ts` and run on the server, so the API key never reaches the browser. The
success page re-fetches the order rather than trusting the URL, and only shows orders tagged `T-sats Shop`. There's no
webhook: the demo has nothing to fulfil, so the `redirectUrl` is all it needs.

## Setup

Copy `.env.example` to `.env.local` and fill it in:

- `ZAPRITE_API_KEY`: API key for the Zaprite org that receives the payments.
- `ZAPRITE_CHECKOUT_ID` (optional): the checkout to use, with Zaprite Pay enabled. Without it, orders use the org's
  default checkout.

```bash
npm install
npm run dev
```

## Deploying

Import the folder into Vercel, add the env vars above, and point `t-sats.com` at the project.
