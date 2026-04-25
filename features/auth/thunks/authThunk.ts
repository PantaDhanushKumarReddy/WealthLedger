import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userName, password }: { userName: string; password: string }) => {
    await new Promise((res) => setTimeout(res, 1200));

    if (!userName || password !== "1234") {
      throw new Error("Invalid credentials");
    }

    return {
      username: userName,
    };
  },
);
