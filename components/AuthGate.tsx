"use client";

import LoginForm from "./LoginForm";
import DashboardShell from "./DashboardShell";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/selectors/authSelectors";

export default function AuthGate() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? (<DashboardShell />) : (<LoginForm />);
}