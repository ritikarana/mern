
import { useCallback, useState } from 'react';
import { postData } from '../services/api';
import { UserPayload } from '../services/api'

const useSaveUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSaved, setSave] = useState(false);

  const saveUser = async (payload: UserPayload) => {
    setSave(true);
    setLoading(true);
    try {
      const result = await postData(payload);
      setData(result);
      setLoading(false);

    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false)
    }

  };

     // Reset after 
     const reset = useCallback(() => {
      setSave(false);
      setLoading(false);
      setError(false);
      setData(null)
    }, []);

  return { saveUser, data, loading, error, isSaved, reset };
};


export default useSaveUser;