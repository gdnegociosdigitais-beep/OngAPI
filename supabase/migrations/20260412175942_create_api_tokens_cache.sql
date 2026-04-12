/*
  # Create API Tokens Cache Table

  ## Purpose
  Stores short-lived access tokens from external APIs (e.g., SafefyPay) so they
  can be reused across multiple Edge Function invocations, avoiding rate-limit
  errors caused by requesting a new token on every transaction.

  ## New Tables
  - `api_tokens`
    - `id` (uuid, primary key)
    - `provider` (text, unique) — identifies the API, e.g. 'safefypay'
    - `access_token` (text) — the bearer token
    - `expires_at` (timestamptz) — when the token expires
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled: only the service role can read/write (no authenticated user policy)
  - This table is exclusively accessed by Edge Functions using SUPABASE_SERVICE_ROLE_KEY
*/

CREATE TABLE IF NOT EXISTS api_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text UNIQUE NOT NULL,
  access_token text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can select api_tokens"
  ON api_tokens FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert api_tokens"
  ON api_tokens FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update api_tokens"
  ON api_tokens FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
