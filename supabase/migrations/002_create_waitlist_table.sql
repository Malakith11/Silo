-- Create waitlist table for email signups before user registration
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  referral_source TEXT, -- How they heard about us (optional)
  utm_source TEXT, -- Marketing attribution (optional)
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address INET, -- For analytics/fraud prevention
  user_agent TEXT, -- Browser info
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'converted')),
  position INTEGER, -- Their position in the waitlist
  invited_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON public.waitlist(position);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (signup)
CREATE POLICY "Anyone can signup for waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own waitlist entry by email
CREATE POLICY "Users can view their own waitlist entry" ON public.waitlist
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_waitlist_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_updated_at_column();

-- Function to automatically set waitlist position
CREATE OR REPLACE FUNCTION set_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  -- Set position to next available number
  NEW.position = COALESCE(
    (SELECT MAX(position) + 1 FROM public.waitlist WHERE position IS NOT NULL),
    1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically set position on insert
CREATE TRIGGER set_waitlist_position_trigger
  BEFORE INSERT ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION set_waitlist_position();