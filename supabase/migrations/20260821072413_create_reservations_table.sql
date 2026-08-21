/*
# Create reservations table for Giri restaurant

1. New Tables
- `reservations`
  - `id` (uuid, primary key)
  - `name` (text, not null) - guest full name
  - `email` (text, not null) - guest email
  - `phone` (text, not null) - guest phone number
  - `party_size` (int, not null) - number of guests
  - `reservation_date` (date, not null) - date of reservation
  - `reservation_time` (time, not null) - time of reservation
  - `occasion` (text) - optional occasion note
  - `notes` (text) - optional special requests
  - `status` (text, default 'pending') - pending / confirmed / cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reservations`.
- This is a no-auth public restaurant site: allow anon + authenticated to INSERT (guests submit bookings) and SELECT their own submission is not needed; we keep SELECT restricted to authenticated (admin) only, while anon can INSERT. For simplicity and since there's no admin login, we allow anon INSERT only and disable SELECT/UPDATE/DELETE for anon.
- Actually, per guidance, for a no-auth app use TO anon, authenticated. But reservations contain guest PII so we should NOT allow anon SELECT. We allow anon INSERT (guests booking) and anon cannot SELECT/UPDATE/DELETE. Authenticated (owner) can do full CRUD.
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  party_size int NOT NULL CHECK (party_size > 0 AND party_size <= 20),
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  occasion text,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Guests (anon) can create reservations
DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations"
ON reservations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No anon SELECT/UPDATE/DELETE - only authenticated (restaurant owner) can manage
DROP POLICY IF EXISTS "auth_select_reservations" ON reservations;
CREATE POLICY "auth_select_reservations"
ON reservations FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "auth_update_reservations" ON reservations;
CREATE POLICY "auth_update_reservations"
ON reservations FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_reservations" ON reservations;
CREATE POLICY "auth_delete_reservations"
ON reservations FOR DELETE
TO authenticated
USING (true);
