import type {PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {type User, loginUser, registerUser} from "../api/api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (newUser: User, {rejectWithValue}) => {
    const user = await registerUser(newUser);
    if (!user) {
      return rejectWithValue("Registration failed");
    }
    return user;
  },
);

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: {email: string; password: string}, {rejectWithValue}) => {
    const user = await loginUser(credentials.email, credentials.password);

    if (!user) return rejectWithValue("Invalid email or password.");

    // store token and user id
    const fakeToken = btoa(`${user.email}:${Date.now()}`);
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("currentUserId", user.id!);

    return {user, token: fakeToken};
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
