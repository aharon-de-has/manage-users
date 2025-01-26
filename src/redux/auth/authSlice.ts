import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: localStorage.getItem('authToken') || null, 
    isAuthenticated: !!localStorage.getItem('authToken'), 
    error: null },
    
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem('authToken', action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.token = null;
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;
