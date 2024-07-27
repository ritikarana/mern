
import { useState, useEffect } from 'react';
import { fetchData } from '../services/api';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    };

    getData();
  }, []);

  return { data, loading };
};

export default useFetch;