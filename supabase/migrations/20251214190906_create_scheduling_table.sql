/*
  # Create Scheduling Table

  1. New Tables
    - `scheduled_meetings`
      - `id` (uuid, primary key)
      - `name` (text) - Customer's full name
      - `email` (text) - Customer's email address
      - `phone` (text) - Customer's phone number
      - `company` (text) - Restaurant name
      - `preferred_date` (date) - Preferred meeting date
      - `preferred_time` (text) - Preferred meeting time
      - `message` (text) - Additional message from customer
      - `type` (text) - Type of meeting (strategy or norcast)
      - `status` (text) - Meeting status (pending, confirmed, completed, cancelled)
      - `created_at` (timestamptz) - When the request was submitted
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `scheduled_meetings` table
    - Add policy for inserting meeting requests (public access for form submissions)
    - Add policy for reading own meeting requests
*/

CREATE TABLE IF NOT EXISTS scheduled_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text DEFAULT '',
  type text NOT NULL CHECK (type IN ('strategy', 'norcast')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scheduled_meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert meeting requests"
  ON scheduled_meetings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow users to read own meeting requests"
  ON scheduled_meetings
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_scheduled_meetings_email ON scheduled_meetings(email);
CREATE INDEX IF NOT EXISTS idx_scheduled_meetings_status ON scheduled_meetings(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_meetings_created_at ON scheduled_meetings(created_at DESC);
