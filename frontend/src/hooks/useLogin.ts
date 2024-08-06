
import { useState } from 'react';
import { login, UserLogin } from '../services/api';

const useSaveUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchToken = async (payload: UserLogin) => {
    setLoading(true);
    setError('');
    try {
      await login(payload).then((res) => {
        setData(res);
        setLoading(false);
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false)
    }

  };

  return { fetchToken, data, loading, error };
};


export default useSaveUser;