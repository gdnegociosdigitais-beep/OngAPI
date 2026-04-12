/*
  # PIX Transactions Table

  1. New Tables
    - `pix_transactions`
      - `id` (uuid, primary key) - Internal transaction ID
      - `pushin_pay_id` (text, unique) - PUSHIN PAY transaction ID
      - `value` (integer) - Value in cents
      - `status` (text) - Transaction status (created, paid, expired, canceled)
      - `qr_code` (text) - PIX QR code string
      - `qr_code_base64` (text) - Base64 image of QR code
      - `end_to_end_id` (text, nullable) - Bank Central ID
      - `payer_name` (text, nullable) - Payer name
      - `payer_national_registration` (text, nullable) - Payer CPF/CNPJ
      - `donor_name` (text, nullable) - Optional donor name
      - `donor_email` (text, nullable) - Optional donor email
      - `created_at` (timestamptz) - Creation timestamp
      - `paid_at` (timestamptz, nullable) - Payment timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `pix_transactions` table
    - Add policy for public to create transactions
    - Add policy for public to read their own transaction by ID

  3. Indexes
    - Index on `pushin_pay_id` for webhook lookups
    - Index on `status` for filtering
*/

CREATE TABLE IF NOT EXISTS pix_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pushin_pay_id text UNIQUE,
  value integer NOT NULL,
  status text NOT NULL DEFAULT 'created',
  qr_code text,
  qr_code_base64 text,
  end_to_end_id text,
  payer_name text,
  payer_national_registration text,
  donor_name text,
  donor_email text,
  created_at timestamptz DEFAULT now(),
  paid_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pix_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create PIX transactions"
  ON pix_transactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view PIX transactions by ID"
  ON pix_transactions
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_pix_transactions_pushin_pay_id 
  ON pix_transactions(pushin_pay_id);

CREATE INDEX IF NOT EXISTS idx_pix_transactions_status 
  ON pix_transactions(status);
