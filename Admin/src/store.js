import { configureStore, createSlice } from "@reduxjs/toolkit";

// Example auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
