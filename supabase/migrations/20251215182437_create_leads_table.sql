/*
  # Create Leads Table for NorWeb Communication HUD

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `name` (text, required) - Lead's full name
      - `phone` (text, required) - Lead's phone number
      - `restaurant_name` (text, nullable) - Restaurant context if applicable
      - `plan_name` (text, nullable) - Selected pricing plan if applicable
      - `created_at` (timestamptz) - Timestamp of lead capture
      - `metadata` (jsonb, nullable) - Additional data (utm params, device info, etc.)

  2. Security
    - Enable RLS on `leads` table
    - Allow public inserts (for lead capture form)
    - Only authenticated admins can read leads

  3. Indexes
    - Index on created_at for sorting and filtering
    - Index on phone for duplicate detection
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  restaurant_name text,
  plan_name text,
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);