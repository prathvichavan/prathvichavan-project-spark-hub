
# Razorpay Integration Setup

## 1. Database Setup
Run the SQL commands in `razorpay_schema.sql` in your Supabase SQL Editor to create the necessary tables (`orders`, `payments`) and policies.

## 2. Environment Variables (Frontend)
The `VITE_RAZORPAY_KEY_ID` has been added to your `.env` file.
Ensure it is:
```
VITE_RAZORPAY_KEY_ID=rzp_test_Rmlg42gkk8JYl3
```

## 3. Supabase Edge Functions Setup
You need to deploy the Edge Functions and set the secrets.

### Prerequisites
- Supabase CLI installed (`npm i -g supabase`)
- Docker running (for local development) or linked to remote project

### Set Secrets
Run the following commands in your terminal to set the secrets for your Supabase project:

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_Rmlg42gkk8JYl3
supabase secrets set RAZORPAY_KEY_SECRET=jFYzx2LwVFKquFXKJXCxyxRT
```

### Deploy Functions
Deploy the functions to your Supabase project:

```bash
supabase functions deploy create-order
supabase functions deploy verify-payment
```

## 4. Testing
1. Run the project: `npm run dev`
2. Go to a project page and click "Buy Now".
3. Complete the payment using the Test Mode credentials (e.g., Netbanking -> Success).
4. You should be redirected to the Success page.

## 5. Go Live
1. Change the keys in `.env` and Supabase Secrets to your Live keys.
2. Switch Razorpay Dashboard to Live Mode.
