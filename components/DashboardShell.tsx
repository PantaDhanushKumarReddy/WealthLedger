"use client";
import { logout } from "@/features/auth/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectUsername } from "@/features/auth/selectors/authSelectors";

export default function DashboardShell() {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);

  const txCount = useAppSelector((state) => state.transactions.data.length);

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Welcome {username}</h1>

        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-2 bg-white/10 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-6 bg-white/5 rounded-2xl">
        Transactions Loaded: {txCount}
      </div>
    </div>
  );
}
