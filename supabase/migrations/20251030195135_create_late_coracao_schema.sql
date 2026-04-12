/*
  # Late Coração ONG - Database Schema

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `amount` (decimal)
      - `frequency` (text: 'one-time' or 'monthly')
      - `payment_method` (text: 'pix' or 'card')
      - `donor_email` (text, optional)
      - `donor_name` (text, optional)
      - `status` (text: 'pending', 'completed', 'failed')
      - `created_at` (timestamptz)
    
    - `animals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `species` (text: 'dog' or 'cat')
      - `age` (text)
      - `size` (text: 'small', 'medium', 'large')
      - `description` (text)
      - `image_url` (text)
      - `status` (text: 'available', 'adopted', 'in_treatment')
      - `created_at` (timestamptz)
    
    - `adoption_requests`
      - `id` (uuid, primary key)
      - `animal_id` (uuid, foreign key to animals)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `city` (text)
      - `experience` (text)
      - `status` (text: 'pending', 'approved', 'rejected')
      - `created_at` (timestamptz)
    
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `phone` (text, optional)
      - `consent` (boolean)
      - `created_at` (timestamptz)
    
    - `volunteer_applications`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `type` (text: 'walker', 'temporary_home', 'events', 'other')
      - `message` (text)
      - `status` (text: 'pending', 'approved', 'rejected')
      - `created_at` (timestamptz)
    
    - `statistics`
      - `id` (uuid, primary key)
      - `animals_rescued` (integer)
      - `adoptions_completed` (integer)
      - `castrations` (integer)
      - `active_volunteers` (integer)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for insert operations for public forms
*/

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount decimal(10, 2) NOT NULL,
  frequency text NOT NULL CHECK (frequency IN ('one-time', 'monthly')),
  payment_method text NOT NULL CHECK (payment_method IN ('pix', 'card')),
  donor_email text,
  donor_name text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert donations"
  ON donations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view completed donations stats"
  ON donations FOR SELECT
  TO anon
  USING (status = 'completed');

-- Create animals table
CREATE TABLE IF NOT EXISTS animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL CHECK (species IN ('dog', 'cat')),
  age text NOT NULL,
  size text NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  description text NOT NULL,
  image_url text,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'in_treatment')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available animals"
  ON animals FOR SELECT
  TO anon
  USING (status = 'available');

-- Create adoption_requests table
CREATE TABLE IF NOT EXISTS adoption_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id uuid REFERENCES animals(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  experience text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert adoption requests"
  ON adoption_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  consent boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert newsletter subscriptions"
  ON newsletter_subscriptions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create volunteer_applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  type text NOT NULL CHECK (type IN ('walker', 'temporary_home', 'events', 'other')),
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert volunteer applications"
  ON volunteer_applications FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  animals_rescued integer NOT NULL DEFAULT 0,
  adoptions_completed integer NOT NULL DEFAULT 0,
  castrations integer NOT NULL DEFAULT 0,
  active_volunteers integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view statistics"
  ON statistics FOR SELECT
  TO anon
  USING (true);

-- Insert initial statistics
INSERT INTO statistics (animals_rescued, adoptions_completed, castrations, active_volunteers)
VALUES (347, 289, 412, 57)
ON CONFLICT DO NOTHING;

-- Insert sample animals
INSERT INTO animals (name, species, age, size, description, image_url, status) VALUES
  ('Thor', 'dog', '3 anos', 'large', 'Thor é um cachorro carinhoso e cheio de energia. Adora brincar e é ótimo com crianças!', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Luna', 'cat', '1 ano', 'small', 'Luna é uma gatinha dócil e tranquila. Perfeita para apartamento!', 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Bob', 'dog', '5 anos', 'medium', 'Bob é calmo, já vacinado e castrado. Um companheiro ideal para todas as idades.', 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Mia', 'cat', '2 anos', 'small', 'Mia é brincalhona e sociável. Ama carinho e atenção!', 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Max', 'dog', '4 anos', 'medium', 'Max é protetor e leal. Precisa de um lar com quintal.', 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Nina', 'cat', '6 meses', 'small', 'Nina é filhote cheia de energia e curiosidade. Linda e saudável!', 'https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=800', 'available')
ON CONFLICT DO NOTHING;