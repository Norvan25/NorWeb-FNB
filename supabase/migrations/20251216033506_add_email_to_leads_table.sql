/*
  # Add Email Field to Leads Table

  1. Changes
    - Add `email` column to `leads` table (text, required)
    - Add index on email for faster lookups and duplicate detection

  2. Notes
    - Email field is required for better lead communication
    - Index helps with duplicate detection and searching
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'email'
  ) THEN
    ALTER TABLE leads ADD COLUMN email text NOT NULL DEFAULT '';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);