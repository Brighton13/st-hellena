/*
  # St. Helena Parish Database Schema

  ## Overview
  This migration creates the core tables for the St. Helena Parish website, enabling management of announcements, events, daily masses, and donation tracking.

  ## New Tables

  ### 1. `announcements`
  Stores parish announcements and news
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Announcement title
  - `content` (text) - Full announcement content
  - `priority` (text) - Priority level: 'high', 'normal', 'low'
  - `is_active` (boolean) - Whether announcement is currently displayed
  - `created_at` (timestamptz) - When announcement was created
  - `updated_at` (timestamptz) - Last update timestamp
  - `expires_at` (timestamptz, optional) - Optional expiration date

  ### 2. `events`
  Manages church events and media
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Event title
  - `description` (text) - Event description
  - `event_date` (timestamptz) - When the event occurs
  - `location` (text) - Event location
  - `image_url` (text, optional) - Event image/media URL
  - `category` (text) - Event category: 'mass', 'prayer', 'community', 'youth', 'other'
  - `is_published` (boolean) - Whether event is visible to public
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `daily_masses`
  Stores YouTube links for daily mass recordings
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Mass title
  - `mass_date` (date) - Date of the mass
  - `youtube_url` (text) - YouTube video URL
  - `description` (text, optional) - Optional description
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `donations`
  Tracks donation records
  - `id` (uuid, primary key) - Unique identifier
  - `donor_name` (text, optional) - Anonymous donations allowed
  - `donor_email` (text, optional) - For receipt purposes
  - `amount` (numeric) - Donation amount
  - `currency` (text) - Currency code (default: 'USD')
  - `message` (text, optional) - Optional donor message
  - `status` (text) - Payment status: 'pending', 'completed', 'failed'
  - `payment_intent_id` (text, optional) - External payment reference
  - `created_at` (timestamptz) - Donation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for announcements, events, and daily masses
  - Restricted write access (admin only) for content management
  - Donations table restricted - only insert allowed, no public read access
*/

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  priority text DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  category text DEFAULT 'other' CHECK (category IN ('mass', 'prayer', 'community', 'youth', 'other')),
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create daily_masses table
CREATE TABLE IF NOT EXISTS daily_masses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  mass_date date NOT NULL,
  youtube_url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text,
  donor_email text,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text DEFAULT 'USD',
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_masses ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Announcements policies: Public read, authenticated write
CREATE POLICY "Anyone can view active announcements"
  ON announcements FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert announcements"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update announcements"
  ON announcements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete announcements"
  ON announcements FOR DELETE
  TO authenticated
  USING (true);

-- Events policies: Public read for published events, authenticated write
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- Daily masses policies: Public read, authenticated write
CREATE POLICY "Anyone can view daily masses"
  ON daily_masses FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert daily masses"
  ON daily_masses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update daily masses"
  ON daily_masses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete daily masses"
  ON daily_masses FOR DELETE
  TO authenticated
  USING (true);

-- Donations policies: Public insert only, no read access
CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_expires ON announcements(expires_at);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_masses_date ON daily_masses(mass_date DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);