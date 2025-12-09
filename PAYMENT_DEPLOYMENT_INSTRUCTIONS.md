# Payment System Rebuild Details

I have completely replaced the Supabase Edge Functions with Vercel Serverless Functions (Node.js) for reliability and better compatibility with the `razorpay` NPM package.

## 1. New API Endpoints (Vercel)
The following files are now located in the `/api` directory and will be deployed as serverless functions by Vercel:

- `/api/create-order.js`: Creates Razorpay order.
- `/api/verify-payment.js`: Verifies signature and updates Supabase DB.

## 2. Deleted Files
- `supabase/functions/create-order` (Removed)
- `supabase/functions/verify-payment` (Removed)

## 3. Frontend Updates
- `PaymentDialog.tsx` now calls `/api/create-order` and `/api/verify-payment` instead of `supabase.functions.invoke()`.

## 4. Environment Variables Checklist (Vercel)
You must ensure these environment variables are set in your **Vercel Project Settings**:

| Variable | Value |
|---|---|
| `RAZORPAY_KEY_ID` | `rzp_live_RpXlTM8rqD5GH4` |
| `RAZORPAY_SECRET_KEY` | `O8VqN4yBLKdTkqC2BqGJOqqY` |
| `SUPABASE_URL` | (Your Supabase URL) |
| `SUPABASE_SERVICE_ROLE_KEY` | (Your Supabase Service Role Key) |

**Note**: Do not expose `RAZORPAY_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to the public (do not set `NEXT_PUBLIC_` prefix).

## 5. Deployment
Simply push your code to GitHub/Vercel:

```bash
git add .
git commit -m "Migrate payment functions to Vercel API"
git push
```
