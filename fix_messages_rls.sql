
-- Fix RLS policy for messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous inserts" ON messages;
DROP POLICY IF EXISTS "Allow authenticated read" ON messages;

-- Allow anyone (anon + authenticated) to insert messages
CREATE POLICY "Allow anonymous inserts" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users (admins) to read messages
CREATE POLICY "Allow authenticated read" ON messages
  FOR SELECT
  USING (auth.role() = 'authenticated');
