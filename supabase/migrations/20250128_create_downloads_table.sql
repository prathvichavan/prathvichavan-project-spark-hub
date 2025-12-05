-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own downloads (optional, but good practice)
CREATE POLICY "Users can view their own downloads" ON downloads
  FOR SELECT USING (auth.email() = user_email);

-- Create storage bucket 'project-files' if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy: Public read access to project-files
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-files');

-- Allow authenticated users to upload to project-files (for admin/testing purposes)
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-files');
