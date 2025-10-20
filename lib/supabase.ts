import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Announcement = {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'normal' | 'low';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string | null;
  category: 'mass' | 'prayer' | 'community' | 'youth' | 'other';
  is_published: boolean;
  created_at: string;
};

export type DailyMass = {
  id: string;
  title: string;
  mass_date: string;
  youtube_url: string;
  description: string | null;
  created_at: string;
};

export type Donation = {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  currency: string;
  message: string | null;
  status: 'pending' | 'completed' | 'failed';
  payment_intent_id: string | null;
  created_at: string;
};
