import type {PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {type User, loginUser, registerUser} from "../api/api";
import {
  ERROR_MESSAGES,
  STORAGE_KEYS,
  SUCCESS_MESSAGES,
} from "../constants/messages";

// State interface
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
  loading: false,
  error: null,
  success: null,
};

// Register thunk
export const register = createAsyncThunk<User, User>(
  "auth/register",
  async (newUser, {rejectWithValue}) => {
    const user = await registerUser(newUser);
    if (!user) return rejectWithValue(ERROR_MESSAGES.REGISTRATION_FAILED);
    return user;
  },
);

// Login thunk
export const login = createAsyncThunk<
  {user: User; token: string},
  {email: string; password: string}
>("auth/login", ({email, password}, {rejectWithValue}) => {
  return loginUser(email, password)
    .then((user) => {
      if (!user) {
        return rejectWithValue("Invalid credentials. Please register first.");
      }

      const fakeToken = btoa(`${user.email}:${Date.now()}`);
      localStorage.setItem(STORAGE_KEYS.TOKEN, fakeToken);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id!);

      return {user, token: fakeToken};
    })
    .catch(() => {
      return rejectWithValue("Invalid credentials. Please register first.");
    });
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = SUCCESS_MESSAGES.LOGOUT_SUCCESS;
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = null;
        state.success = SUCCESS_MESSAGES.REGISTER_SUCCESS;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = SUCCESS_MESSAGES.LOGIN_SUCCESS;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
