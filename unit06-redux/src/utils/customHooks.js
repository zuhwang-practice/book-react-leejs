import { useState, useEffect } from 'react';

const useRequest = (callback) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const process = async () => {
      setIsLoading(true);
      try {
        const res = await callback();
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    process();
  }, []);

  return { response, error, isLoading };
};

export { useRequest };
