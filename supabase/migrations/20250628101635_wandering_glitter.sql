/*
  # Create friend requests table

  1. New Tables
    - `friend_requests`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, foreign key to users)
      - `receiver_id` (uuid, foreign key to users)
      - `message` (text)
      - `status` (enum: pending, accepted, rejected)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `friend_requests` table
    - Add policies for users to manage their friend requests
*/

CREATE TYPE request_status AS ENUM ('pending', 'accepted', 'rejected');

CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  status request_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;

-- Policy for users to read friend requests they're involved in
CREATE POLICY "Users can read own friend requests"
  ON friend_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Policy for users to create friend requests
CREATE POLICY "Users can create friend requests"
  ON friend_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Policy for users to update friend requests they're involved in
CREATE POLICY "Users can update own friend requests"
  ON friend_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);