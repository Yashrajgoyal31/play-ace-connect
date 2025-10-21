import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function usePlayerPoints(userId?: string, sportFilter?: string) {
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let isCancelled = false;
    async function fetchPoints() {
      setLoading(true);
      setError(null);
      try {
        // Find player profile for this user
        const { data: players, error: playersError } = await (supabase as any)
          .from('players')
          .select('id')
          .eq('user_id', userId)
          .limit(1)
          .maybeSingle();
        if (playersError) throw playersError;
        const playerId = players?.id;
        if (!playerId) {
          if (!isCancelled) setPoints(0);
          return;
        }

        // Sum points across sports, or filter by sport
        let query = (supabase as any)
          .from('player_stats')
          .select('total_points, sport')
          .eq('player_id', playerId);

        if (sportFilter) {
          query = query.eq('sport', sportFilter);
        }

        const { data: stats, error: statsError } = await query; 
        if (statsError) throw statsError;

        const total = Array.isArray(stats)
          ? stats.reduce((acc: number, row: any) => acc + Number(row.total_points || 0), 0)
          : 0;
        if (!isCancelled) setPoints(total);
      } catch (e: any) {
        if (!isCancelled) setError(e?.message || 'Failed to fetch points');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchPoints();
    return () => {
      isCancelled = true;
    };
  }, [userId, sportFilter]);

  return { points, loading, error };
}


