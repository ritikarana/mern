import axios from 'axios';
import { error } from 'console';

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

export interface UserLogin {
  email: String,
  password: String,
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or show a message
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


export const fetchData = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const postData = async (payload: UserPayload) => {
    const response = await api.post('/user', payload);
    return response.data;
  };

  export const login = async (payload: UserLogin) => {
    const response = await api.post('/user/login', payload);
    return response.data;
  };

  export const getAllUsers = async () => {
    try {
      const { data } = await api.get('/user');
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  };

  export const deleteUser = async (id: string) => {
    try {
      const { data } = await api.delete(`/user/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  };