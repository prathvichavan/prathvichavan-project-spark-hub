-- Razorpay Schema (New Implementation)

-- Ensure we have the necessary extensions (usually enabled by default in Supabase)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create/Update Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL, -- Link to project (assuming projects table exists)
    user_id UUID NOT NULL REFERENCES auth.users(id),
    razorpay_order_id TEXT NOT NULL UNIQUE,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'created', -- created, paid, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create/Update Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    razorpay_payment_id TEXT NOT NULL UNIQUE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_signature TEXT NOT NULL,
    user_email TEXT,
    amount NUMERIC,
    status TEXT DEFAULT 'captured',
    download_url TEXT, -- Store the generated download URL for reference
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert orders (via Edge Function ideally, but client side simplified flow might need this if direct insert, but we are using Edge Function so RLS might not apply if using Service Role key. However, for client read access:)
-- We are using Edge Function for insertion, so 'insert' policy for public might not be needed if Edge Function creates it with Service Role.
-- But let's allow authenticated users to read.

-- Allow users to view their own payments (linked via order?)
-- Since payments doesn't have user_id directly (it has it via order or user_email), we might need a join or just add user_id to payments for easier RLS.
-- Let's add user_id to payments to make RLS easier.
ALTER TABLE payments ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user_project ON orders(user_id, project_id);
CREATE INDEX IF NOT EXISTS idx_orders_rzp_order_id ON orders(razorpay_order_id);
