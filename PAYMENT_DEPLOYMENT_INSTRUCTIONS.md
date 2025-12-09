# Payment System Rebuild Instructions

This guide details the new payment flow implementation and deployment steps.

## 1. Clean Up
The following legacy files have been removed/replaced:
- `src/utils/razorpay.ts` (Deleted)
- `supabase/functions/verify-user-payment` (Deleted/Replaced)
- `src/components/PaymentDialog.tsx` (Rewritten)
- `supabase/functions/create-order` (Rewritten)
- `supabase/functions/verify-payment` (Rewritten)

## 2. Database Schema Update
You must update your Supabase database schema to support the new flow.
Run the content of `new_razorpay_schema.sql` in your Supabase SQL Editor.

## 3. Environment Variables
You need to set the following secrets in your Supabase Project (Settings > Edge Functions > Secrets).

| Name | Value |
|------|-------|
| `RAZORPAY_KEY_ID` | `rzp_live_RpXlTM8rqD5GH4` |
| `RAZORPAY_SECRET_KEY` | `O8VqN4yBLKdTkqC2BqGJOqqY` |
| `SUPABASE_URL` | (Your Supabase URL) |
| `SUPABASE_SERVICE_ROLE_KEY` | (Your Supabase Service Role Key) |

To set these via CLI:
```bash
npx supabase secrets set RAZORPAY_KEY_ID=rzp_live_RpXlTM8rqD5GH4
npx supabase secrets set RAZORPAY_SECRET_KEY=O8VqN4yBLKdTkqC2BqGJOqqY
```

## 4. Deployment Steps

### Deploy Edge Functions
Run the following command to deploy the new functions:

```bash
npx supabase functions deploy create-order --no-verify-jwt
npx supabase functions deploy verify-payment --no-verify-jwt
```
*Note: `--no-verify-jwt` is optional but ensures `create-order` can be called if you manage public access, although our client sends auth headers. If you enforce JWT, ensure your client is logged in.*

### Deploy Frontend
Push your changes to your Vercel repository.
```bash
git add .
git commit -m "Rebuild Razorpay Payment Flow"
git push
```

## 5. Testing
1. Login to the app.
2. Select a project and click "Pay Now" (or Buy).
3. The Razorpay popup should appear.
4. Complete payment (using a Live card or Test mode if you switch keys).
5. Watch for the success toast.
6. You should be automatically redirected to `/download/{projectId}`.

## 6. Folder Structure (New)
```
/src
  /components
    PaymentDialog.tsx  (Frontend Logic)
/supabase
  /functions
    /create-order
      index.ts         (Backend Order Creation)
    /verify-payment
      index.ts         (Backend Verification)
```
