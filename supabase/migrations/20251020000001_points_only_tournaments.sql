-- Enforce points only for tournament matches in worker-level logic via a helper view

-- Helper view exposes tournament weight; casual matches have NULL tournament_id
CREATE OR REPLACE VIEW match_with_tournament AS
SELECT m.*, t.weight AS tournament_weight
FROM matches m
LEFT JOIN tournaments t ON t.id = m.tournament_id;

-- Optional: guard ledger writes using a constraint trigger (if you ever write inside DB)
-- Prevent points_ledger inserts for matches without tournament_id
CREATE OR REPLACE FUNCTION guard_ledger_only_tournaments() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  mt record;
BEGIN
  IF NEW.match_id IS NULL THEN
    RETURN NEW; -- allow non-match ledger entries (e.g., challenges)
  END IF;
  SELECT tournament_id FROM matches WHERE id = NEW.match_id INTO mt;
  IF mt.tournament_id IS NULL THEN
    RAISE EXCEPTION 'Points can only be awarded for tournament matches';
  END IF;
  RETURN NEW;
END; $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_guard_ledger_only_tournaments'
  ) THEN
    DROP TRIGGER trg_guard_ledger_only_tournaments ON points_ledger;
  END IF;
  CREATE CONSTRAINT TRIGGER trg_guard_ledger_only_tournaments
  BEFORE INSERT ON points_ledger
  FOR EACH ROW
  EXECUTE PROCEDURE guard_ledger_only_tournaments();
END $$;


