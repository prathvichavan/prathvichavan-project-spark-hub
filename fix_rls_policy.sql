-- Run this in your Supabase SQL Editor to fix the "violates row-level security policy" error

-- 1. Enable RLS on the messages table (if not already enabled)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy to allow anyone (anonymous users) to insert data into the messages table
-- We use "IF NOT EXISTS" logic by dropping it first to avoid errors if it partially exists
DROP POLICY IF EXISTS "Allow anonymous inserts" ON messages;

CREATE POLICY "Allow anonymous inserts" ON messages
  FOR INSERT
  WITH CHECK (true);

-- 3. (Optional) Allow you (authenticated admins) to view the messages
DROP POLICY IF EXISTS "Allow authenticated read" ON messages;

CREATE POLICY "Allow authenticated read" ON messages
  FOR SELECT
  USING (auth.role() = 'authenticated');
