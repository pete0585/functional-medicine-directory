-- Drop bootstrap tables (empty, no data loss)
DROP TABLE IF EXISTS functional_medicine_reviews CASCADE;
DROP TABLE IF EXISTS functional_medicine_payments CASCADE;
DROP TABLE IF EXISTS functional_medicine_claims CASCADE;
DROP TABLE IF EXISTS functional_medicine_listings CASCADE;

-- fm_listings: main directory table
CREATE TABLE fm_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  practitioner_type TEXT NOT NULL DEFAULT 'md',
  listing_tier TEXT NOT NULL DEFAULT 'unclaimed',
  listing_tier_rank INTEGER NOT NULL DEFAULT 4,
  practice_name TEXT,
  phone TEXT,
  website TEXT,
  email TEXT,
  email_source VARCHAR,
  do_not_email BOOLEAN NOT NULL DEFAULT FALSE,
  address TEXT,
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  zip TEXT,
  latitude FLOAT8,
  longitude FLOAT8,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  conditions_treated TEXT[] NOT NULL DEFAULT '{}',
  accepting_new_patients BOOLEAN NOT NULL DEFAULT TRUE,
  telehealth_available BOOLEAN NOT NULL DEFAULT FALSE,
  is_ifm_certified BOOLEAN NOT NULL DEFAULT FALSE,
  bio TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_approved BOOLEAN NOT NULL DEFAULT TRUE,
  claimed_at TIMESTAMPTZ,
  claimed_by_email TEXT,
  outreach_sent_at TIMESTAMPTZ,
  upgrade_nudge_step INTEGER NOT NULL DEFAULT 0,
  upgrade_nudge_sent_at TIMESTAMPTZ,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX fm_listings_state_idx ON fm_listings (state);
CREATE INDEX fm_listings_city_idx ON fm_listings (city);
CREATE INDEX fm_listings_listing_tier_rank_idx ON fm_listings (listing_tier_rank);
CREATE INDEX fm_listings_is_active_idx ON fm_listings (is_active);
CREATE INDEX fm_listings_email_idx ON fm_listings (email);
CREATE INDEX fm_listings_created_at_idx ON fm_listings (created_at DESC);
CREATE INDEX fm_listings_practitioner_type_idx ON fm_listings (practitioner_type);
CREATE INDEX fm_listings_specialties_idx ON fm_listings USING GIN (specialties);
CREATE INDEX fm_listings_conditions_idx ON fm_listings USING GIN (conditions_treated);

-- Full-text search
ALTER TABLE fm_listings ADD COLUMN search_vector TSVECTOR;
CREATE INDEX fm_listings_search_idx ON fm_listings USING GIN (search_vector);

CREATE OR REPLACE FUNCTION fm_listings_search_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    COALESCE(NEW.full_name, '') || ' ' ||
    COALESCE(NEW.practice_name, '') || ' ' ||
    COALESCE(NEW.city, '') || ' ' ||
    COALESCE(NEW.state, '') || ' ' ||
    COALESCE(NEW.practitioner_type, '') || ' ' ||
    COALESCE(NEW.bio, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fm_listings_search_trigger
  BEFORE INSERT OR UPDATE ON fm_listings
  FOR EACH ROW EXECUTE FUNCTION fm_listings_search_update();

-- updated_at auto-update
CREATE OR REPLACE FUNCTION fm_listings_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fm_listings_updated_at_trigger
  BEFORE UPDATE ON fm_listings
  FOR EACH ROW EXECUTE FUNCTION fm_listings_updated_at();

-- fm_claims: claim verification tokens
CREATE TABLE fm_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES fm_listings(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  nudge_sent_at TIMESTAMPTZ
);

CREATE INDEX fm_claims_listing_id_idx ON fm_claims (listing_id);
CREATE INDEX fm_claims_token_idx ON fm_claims (token);
CREATE INDEX fm_claims_email_idx ON fm_claims (email);

-- fm_payments: Stripe payment records
CREATE TABLE fm_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES fm_listings(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'usd',
  tier TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'succeeded',
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX fm_payments_listing_id_idx ON fm_payments (listing_id);

-- fm_leads: newsletter / contact leads
CREATE TABLE fm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'newsletter',
  directory TEXT NOT NULL DEFAULT 'functional-medicine',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE fm_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fm_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE fm_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fm_leads ENABLE ROW LEVEL SECURITY;

-- Public read for active, approved listings
CREATE POLICY "fm_listings_public_read" ON fm_listings
  FOR SELECT TO anon, authenticated
  USING (is_active = true AND is_approved = true);

-- Service role full access
CREATE POLICY "fm_listings_service_role" ON fm_listings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "fm_claims_service_role" ON fm_claims
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "fm_payments_service_role" ON fm_payments
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "fm_leads_service_role" ON fm_leads
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow public claim verification reads
CREATE POLICY "fm_claims_public_read" ON fm_claims
  FOR SELECT TO anon, authenticated USING (true);
