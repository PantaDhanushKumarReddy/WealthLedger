import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/authThunk";
import type { AuthState } from "../types";

const initialState: AuthState = {
  username: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.username = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Username required / Password = 1234";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;