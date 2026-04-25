import type { RootState } from "@/app/store";

export const selectUsername = (state: RootState) => state.auth.username;

export const selectLoading = (state: RootState) => state.auth.loading;

export const selectLoginError = (state: RootState) => state.auth.error;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
