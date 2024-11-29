
import { useState } from 'react';
import { getUser, UserPayload } from '../services/api';

const useFetch = () => {
  const [data, setData] = useState<UserPayload>({
    name: '',
    age: 10,
    email: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);

  const getData = async (id: string | undefined) => {
    if (!id) return;
    try {
      const result = await getUser(id);
      setData(result);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }

  };
  return { getData, data, loading };
};

export default useFetch;