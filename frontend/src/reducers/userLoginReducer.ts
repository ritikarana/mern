import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin, login } from '../services/api';

const initialToken = localStorage.getItem('token');

interface UserState {
  userInfo: { email: string, token: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userInfo: initialToken ? { email: '', token: initialToken } : null,
  loading: false,
  error: null,
  isAuthenticated: initialToken ? true : false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: UserLogin, { rejectWithValue }) => {
    try {
      const response = await login(payload);
      const { token, email } = response;
      localStorage.setItem('token', token);
      return { token, email };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("token")
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false
      state.userInfo = action.payload
    })
  }
});

export const { logout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
