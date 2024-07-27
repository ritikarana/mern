import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json"
  }
});

export interface UserPayload {
    name: String,
    age: Number,
    email: String,
    password: String,
    role: String
}



export const fetchData = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const postData = async (payload: UserPayload) => {
    const response = await api.post('/user', payload);
    return response.data;
  };