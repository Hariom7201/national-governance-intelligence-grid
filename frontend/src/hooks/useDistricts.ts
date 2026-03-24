import { useState, useEffect, useCallback } from 'react';
import { api, District } from '../services/api';

export function useDistricts(simulateLive = false) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.getDistricts();
      setDistricts(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Live simulation
  useEffect(() => {
    if (!simulateLive) return;
    const interval = setInterval(() => {
      setDistricts((prev) =>
        prev.map((d) => ({
          ...d,
          complaints_this_month: Math.max(
            0,
            d.complaints_this_month + Math.floor((Math.random() - 0.4) * 12)
          ),
          health_score: Math.min(
            100,
            Math.max(10, d.health_score + (Math.random() - 0.5) * 3)
          ),
        }))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [simulateLive]);

  return { districts, loading, error, refetch: load };
}