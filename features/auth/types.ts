export interface AuthState {
  username: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}