-- Create quote_requests table for storing lead/quote form submissions

CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  restaurant_name TEXT NOT NULL,
  restaurant_type TEXT NOT NULL,
  num_branches TEXT NOT NULL,
  menu_size TEXT NOT NULL,
  state TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  tracking_uid TEXT,
  source TEXT DEFAULT 'web',
  page_url TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can submit a quote)
CREATE POLICY "Anyone can submit a quote request" ON quote_requests
  FOR INSERT
  WITH CHECK (true);

-- Create policy for reading (only authenticated users with admin role)
-- Adjust this based on your auth setup
CREATE POLICY "Authenticated users can read quote requests" ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

