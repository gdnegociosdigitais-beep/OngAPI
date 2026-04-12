/*
  # Update PIX Transactions for SafefyPay

  1. Changes
    - Replace `pushin_pay_id` column with `safefypay_id`
    - Keep all other functionality intact
    - Update indexes to reference new column

  2. Migration Strategy
    - Drop old index
    - Add new column if needed
    - Update existing data if present
    - Update indexes for webhook lookups
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pix_transactions' AND column_name = 'pushin_pay_id'
  ) THEN
    ALTER TABLE pix_transactions DROP CONSTRAINT IF EXISTS pix_transactions_pushin_pay_id_key;
    ALTER TABLE pix_transactions DROP COLUMN pushin_pay_id;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pix_transactions' AND column_name = 'safefypay_id'
  ) THEN
    ALTER TABLE pix_transactions ADD COLUMN safefypay_id text UNIQUE;
  END IF;
END $$;

DROP INDEX IF EXISTS idx_pix_transactions_pushin_pay_id;

CREATE INDEX IF NOT EXISTS idx_pix_transactions_safefypay_id 
  ON pix_transactions(safefypay_id);
