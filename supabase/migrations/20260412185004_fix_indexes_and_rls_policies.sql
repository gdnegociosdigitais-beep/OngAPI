/*
  # Fix Security Issues: Indexes and RLS Policies

  ## Summary
  This migration addresses several security and performance issues flagged in the Supabase security advisor.

  ## 1. Index Changes

  ### New Index
  - `adoption_requests.animal_id`: Adds a covering index for the foreign key `adoption_requests_animal_id_fkey`
    to prevent full table scans on JOIN/filter queries involving this column.

  ### Dropped Unused Indexes
  - `idx_pix_transactions_status`: Not used by any query plan, removing to reduce write overhead.
  - `idx_pix_transactions_safefypay_id`: Not used by any query plan, removing to reduce write overhead.

  ## 2. RLS Policy Fixes

  The following INSERT policies had `WITH CHECK (true)`, which allows anyone to insert any row
  without restriction. This is flagged as a security concern because it effectively bypasses RLS.

  These public-facing tables are designed to accept anonymous submissions (donations, volunteer
  applications, adoption requests, newsletter sign-ups, PIX transactions), but the policies
  should be tightened to at minimum validate that submitted data fields are not null/empty,
  preventing garbage or empty record insertions.

  Updated tables:
  - `adoption_requests`: Require name, email, phone, city, animal_id to be non-empty
  - `donations`: Require amount > 0 and donor_email to be non-empty
  - `newsletter_subscriptions`: Require email to be non-empty
  - `pix_transactions`: Require value > 0
  - `volunteer_applications`: Require name and email to be non-empty

  ## 3. Notes
  - Auth DB connection strategy (percentage-based) must be changed via the Supabase Dashboard
    under Settings > Database > Connection Pooling. This cannot be changed via SQL migration.
  - All existing data is preserved; no destructive operations are performed.
*/

-- Add covering index for the unindexed foreign key
CREATE INDEX IF NOT EXISTS idx_adoption_requests_animal_id
  ON public.adoption_requests (animal_id);

-- Drop unused indexes
DROP INDEX IF EXISTS public.idx_pix_transactions_status;
DROP INDEX IF EXISTS public.idx_pix_transactions_safefypay_id;

-- Fix RLS: adoption_requests INSERT policy
DROP POLICY IF EXISTS "Anyone can insert adoption requests" ON public.adoption_requests;
CREATE POLICY "Anyone can insert adoption requests"
  ON public.adoption_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    animal_id IS NOT NULL
    AND name IS NOT NULL AND name <> ''
    AND email IS NOT NULL AND email <> ''
    AND phone IS NOT NULL AND phone <> ''
    AND city IS NOT NULL AND city <> ''
  );

-- Fix RLS: donations INSERT policy
DROP POLICY IF EXISTS "Anyone can insert donations" ON public.donations;
CREATE POLICY "Anyone can insert donations"
  ON public.donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    amount IS NOT NULL AND amount > 0
    AND donor_email IS NOT NULL AND donor_email <> ''
  );

-- Fix RLS: newsletter_subscriptions INSERT policy
DROP POLICY IF EXISTS "Anyone can insert newsletter subscriptions" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can insert newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND email <> ''
  );

-- Fix RLS: pix_transactions INSERT policy
DROP POLICY IF EXISTS "Anyone can create PIX transactions" ON public.pix_transactions;
CREATE POLICY "Anyone can create PIX transactions"
  ON public.pix_transactions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    value IS NOT NULL AND value > 0
  );

-- Fix RLS: volunteer_applications INSERT policy
DROP POLICY IF EXISTS "Anyone can insert volunteer applications" ON public.volunteer_applications;
CREATE POLICY "Anyone can insert volunteer applications"
  ON public.volunteer_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND name <> ''
    AND email IS NOT NULL AND email <> ''
  );
