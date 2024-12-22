/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - image_url (text)
      - category (text)
      - created_at (timestamp)
      - user_id (uuid, foreign key)
    - banners
      - id (uuid, primary key)
      - title (text)
      - image_url (text)
      - link (text)
      - active (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text,
  category text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Banners table
CREATE TABLE banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  link text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for banners
CREATE POLICY "Anyone can view active banners"
  ON banners
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage banners"
  ON banners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);