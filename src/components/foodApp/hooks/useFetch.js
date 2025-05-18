import { useEffect, useState } from "react";
/**
 *  fetching hook
 */
export const useFetch = (fetchFn, initialValue) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "failed to send http request" });
      }

      setIsFetching(false);
    };

    fetchData();
  }, []);

  return { isFetching, fetchedData, error };
};
