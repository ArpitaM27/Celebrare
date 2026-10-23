
import { useState, useEffect,  } from 'react';

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 1500;
    async function fetchPhotos() {
      try {
        const response = await fetch(
          'https://picsum.photos/v2/list?limit=30'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;

        if (remaining > 0) {
          await new Promise((resolve) => {
            setTimeout(resolve, remaining);
          });
        }

        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}
