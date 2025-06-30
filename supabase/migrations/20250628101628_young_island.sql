/*
  # Create skill exchanges table

  1. New Tables
    - `skill_exchanges`
      - `id` (uuid, primary key)
      - `teacher_id` (uuid, foreign key to users)
      - `learner_id` (uuid, foreign key to users)
      - `skill_offered` (text)
      - `skill_requested` (text)
      - `status` (enum: pending, accepted, completed, cancelled)
      - `scheduled_at` (timestamp, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `skill_exchanges` table
    - Add policies for users to manage their own exchanges
*/

CREATE TYPE exchange_status AS ENUM ('pending', 'accepted', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS skill_exchanges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  learner_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  skill_offered text NOT NULL,
  skill_requested text NOT NULL,
  status exchange_status DEFAULT 'pending',
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skill_exchanges ENABLE ROW LEVEL SECURITY;

-- Policy for users to read exchanges they're involved in
CREATE POLICY "Users can read own exchanges"
  ON skill_exchanges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = teacher_id OR auth.uid() = learner_id);

-- Policy for users to create exchanges
CREATE POLICY "Users can create exchanges"
  ON skill_exchanges
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = learner_id);

-- Policy for users to update exchanges they're involved in
CREATE POLICY "Users can update own exchanges"
  ON skill_exchanges
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = teacher_id OR auth.uid() = learner_id);