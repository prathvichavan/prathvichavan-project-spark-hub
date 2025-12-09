
# ⚠️ URGENT: FIX "Missing Razorpay Keys" Error

You are seeing the error `Server configuration error: Missing Razorpay keys` because the environment variables are **missing** in your Vercel deployment (or local environment).

Since I switched the system to use Vercel API Routes (for better compatibility), you **MUST** update your Vercel Project Settings.

## 🚀 STEP 1: Add Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your project **tech-project-hub** (or whatever you named it).
3. Go to **Settings** > **Environment Variables**.
4. Add the following keys (copy-paste exactly):

| Key | Value |
|-----|-------|
| `RAZORPAY_KEY_ID` | `rzp_live_RpXlTM8rqD5GH4` |
| `RAZORPAY_SECRET_KEY` | `O8VqN4yBLKdTkqC2BqGJOqqY` |
| `SUPABASE_URL` | *Your Supabase URL (found in Supabase > Settings > API)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *Your Service Role Key (found in Supabase > Settings > API)* |

5. **VERY IMPORTANT**: After adding these variables, you **MUST REDEPLOY** your project for them to take effect.
   - You can trigger a redeploy by pushing a small change (which I have done) or via the Vercel Dashboard ("Deployments" > "Redeploy").

## 💻 STEP 2: Running Locally?

If you want to test this on `localhost`, you must ensure your local `.env` file contains these same keys.
I tried to update your `.env` but file permissions blocked me.
**Please verify your `.env` file looks like this:**

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
RAZORPAY_KEY_ID=rzp_live_RpXlTM8rqD5GH4
RAZORPAY_SECRET_KEY=O8VqN4yBLKdTkqC2BqGJOqqY
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Then run `npm run dev`.

## ✅ Summary of Fixes Applied
1. **API Code**: Updated to attempt loading `dotenv` locally and enabled CORS.
2. **Vercel Config**: Removed conflicting rewrites that were blocking the API.
3. **Dependencies**: Added `dotenv` to ensure keys load locally if configured.

**Try the payment again after redeploying.**
