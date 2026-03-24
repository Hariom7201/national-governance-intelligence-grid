import { useState, useEffect } from 'react';
import { api, Crisis } from '../services/api';

export function useCrisis(district?: string) {
  const [crises, setCrises] = useState<Crisis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (district ? api.getCrisis(district) : api.getCrisis())
      .then(setCrises)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [district]);

  return { crises, loading, error };
}