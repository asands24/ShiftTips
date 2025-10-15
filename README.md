# ShiftTips

A web app to split and calculate restaurant/bar tips fairly.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Stripe:**
   - Create a product in Stripe with a $19 one-time payment
   - Get your Checkout URL and update `src/payments.ts`:
     - Replace `STRIPE_CHECKOUT_URL`
     - Replace `STRIPE_PRICE_ID`

3. **Set Netlify environment variables:**
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `STRIPE_PRICE_ID` - Your Stripe price ID

4. **Run locally:**
   ```bash
   npm run dev
   ```

5. **Deploy to Netlify:**
   - Connect your Git repo to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy!

## Features

**Free:**
- Calculate tips by equal split, hours, or role points
- Add unlimited staff
- Rounding options (1¢ or 5¢)
- Printable summary

**Pro ($19):**
- CSV export
- Save/load presets
- One-time lifetime payment

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Netlify Functions
- Stripe Checkout
