-- Run this in Supabase SQL Editor
-- This will create the payment tables from scratch

-- 1. Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- 2. Create orders table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    razorpay_order_id TEXT NOT NULL UNIQUE,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'created',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    razorpay_payment_id TEXT NOT NULL UNIQUE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_signature TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT,
    amount NUMERIC,
    status TEXT DEFAULT 'captured',
    download_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

-- 6. Create RLS Policies for payments
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- 7. Create indexes for performance
CREATE INDEX idx_orders_user_project ON orders(user_id, project_id);
CREATE INDEX idx_orders_rzp_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_razorpay_order_id ON payments(razorpay_order_id);

-- 8. Grant necessary permissions (Service Role bypasses RLS, but for completeness)
GRANT ALL ON orders TO authenticated;
GRANT ALL ON payments TO authenticated;
GRANT ALL ON orders TO service_role;
GRANT ALL ON payments TO service_role;
