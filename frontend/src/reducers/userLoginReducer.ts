import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../services/api';

interface UserState {
  userInfo: { email: string, password: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string, password: string }>) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending , (state) => {
      state.loading = true
    }).addCase(loginUser.fulfilled , (state, action) => {
      state.loading = false
      state.userInfo = action.payload
    });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
