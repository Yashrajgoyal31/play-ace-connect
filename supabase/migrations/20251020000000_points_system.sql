-- Points System Schema Migration (Supabase/Postgres)
-- Safe DDL with IF NOT EXISTS and upsert patterns

-- 1) players (maps to users; if you already have a players table, skip)
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  city text,
  created_at timestamptz DEFAULT now()
);

-- 2) tournaments (lightweight; if exists, add weight if missing)
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organizer_id uuid,
  weight numeric DEFAULT 1.0,
  sport text NOT NULL,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='tournaments' AND column_name='weight'
  ) THEN
    ALTER TABLE tournaments ADD COLUMN weight numeric DEFAULT 1.0;
  END IF;
END $$;

-- 3) matches (minimal canonical; if exists, add columns if missing)
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id),
  sport text NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled','in_progress','completed','cancelled')),
  payload jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='matches' AND column_name='status'
  ) THEN
    ALTER TABLE matches ADD COLUMN status text NOT NULL DEFAULT 'scheduled';
    ALTER TABLE matches ADD CONSTRAINT matches_status_check CHECK (status IN ('scheduled','in_progress','completed','cancelled'));
  END IF;
END $$;

-- 4) match_players (association)
CREATE TABLE IF NOT EXISTS match_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id),
  team text,
  role text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (match_id, player_id)
);

-- 5) sport_ratings (ELO per sport)
CREATE TABLE IF NOT EXISTS sport_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  sport text NOT NULL,
  elo numeric DEFAULT 1500,
  k_factor numeric DEFAULT 32,
  last_updated timestamptz DEFAULT now(),
  UNIQUE (player_id, sport)
);

CREATE INDEX IF NOT EXISTS idx_sport_ratings_sport ON sport_ratings(sport);

-- 6) player_stats (aggregates)
CREATE TABLE IF NOT EXISTS player_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) UNIQUE,
  sport text,
  total_points numeric DEFAULT 0,
  matches_played integer DEFAULT 0,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_player_stats_sport_points ON player_stats(sport, total_points DESC);

-- 7) points_ledger (auditable source of truth)
CREATE TABLE IF NOT EXISTS points_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  change integer NOT NULL,
  reason_code text NOT NULL,
  reason_detail jsonb,
  match_id uuid REFERENCES matches(id),
  created_at timestamptz DEFAULT now(),
  balance_after numeric
);

CREATE INDEX IF NOT EXISTS idx_points_ledger_player ON points_ledger(player_id, created_at DESC);

-- 8) challenges (optional gamification)
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  points_reward integer NOT NULL,
  criteria jsonb,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 9) redemptions (hooks up to rewards)
CREATE TABLE IF NOT EXISTS redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  item_name text NOT NULL,
  points_cost integer NOT NULL,
  provider text,
  provider_reference jsonb,
  status text NOT NULL CHECK (status IN ('REQUESTED','APPROVED','FULFILLED','CANCELLED','REJECTED')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10) achievements (badges)
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  badge_code text NOT NULL,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- 11) durable queue for match completed events
CREATE TABLE IF NOT EXISTS match_event_queue (
  id bigserial PRIMARY KEY,
  match_id uuid NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- Trigger function to enqueue on match completion
CREATE OR REPLACE FUNCTION enqueue_match_completed() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO match_event_queue (match_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

-- Attach trigger (idempotent re-create)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_enqueue_match_completed'
  ) THEN
    DROP TRIGGER trg_enqueue_match_completed ON matches;
  END IF;
  CREATE TRIGGER trg_enqueue_match_completed
  AFTER UPDATE ON matches
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE PROCEDURE enqueue_match_completed();
END $$;

-- Helper view for leaderboard (materialized can be added later)
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT ps.player_id, ps.sport, ps.total_points, ps.wins, ps.matches_played, pl.display_name
FROM player_stats ps
JOIN players pl ON ps.player_id = pl.id
ORDER BY ps.total_points DESC;


