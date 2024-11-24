import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
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

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, searchParam = '' }: { page: number, searchParam?: string }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user`, {
        params: { page, limit: 5, searchParam }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const postData = async (payload: UserPayload) => {
  const response = await api.post('/user', payload);
  return response.data;
};

export const loginUser = createAsyncThunk('auth/login', async (payload: UserLogin) => {
  try{
  const response = await api.post('/user/login', payload);
  return response.data;
  } catch(error){
    throw new Error(`Unable to Login`)
  }
})

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


export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    try {
      const { data } = await api.delete(`/user/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  }
);

// export const deleteUser = async (id: string) => {
//   try {
//     const { data } = await api.delete(`/user/${id}`);
//     return data;
//   } catch (error) {
//     throw new Error(`Failed to fetch users: ${error}`);
//   }
// };