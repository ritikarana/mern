import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export interface UserPayload {
  name: string,
  age: number,
  email: string,
  password: string,
  role: string,
  status?: string
}

export interface EditUserPayload {
  age: number,
  password: string,
  role: string
}

export interface UserLogin {
  email: string,
  password: string,
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



export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: UserLogin, { rejectWithValue }) => {
    try {
      const response =await api.post('/user/login', payload);
      const { token, email } = response.data;
      localStorage.setItem('token', token);
      return { token, email };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

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

// export const getUser = createAsyncThunk(
//   'users/getUser',
//   async (id: string) => {
//     try {
//       const { data } = await api.get(`/user/${id}`);
//       return data;
//     } catch (error) {
//       throw new Error(`Failed to fetch users: ${error}`);
//     }
//   }
// );

export const getUser = async (id: string) => {
  try {
    const { data } = await api.get(`/user/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};