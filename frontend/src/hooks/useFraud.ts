import { useState, useEffect } from 'react';
import { api, FraudAlert } from '../services/api';

export function useFraud() {
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getFraud()
      .then(setFraudAlerts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { fraudAlerts, loading, error };
}