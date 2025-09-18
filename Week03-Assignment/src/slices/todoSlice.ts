import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  type Todo,
  addTodo as apiAddTodo,
  deleteTodo as apiDeleteTodo,
  getUserTodos as apiGetUserTodos,
} from "../api/api";

// Slice state
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const getUserTodos = createAsyncThunk<Todo[], string>(
  "todos/getUserTodos",
  async (userId) => {
    return await apiGetUserTodos(userId);
  },
);

export const addTodo = createAsyncThunk<Todo, {userId: string; title: string}>(
  "todos/addTodo",
  async ({userId, title}) => {
    return await apiAddTodo(userId, title);
  },
);

export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (todoId) => {
    await apiDeleteTodo(todoId);
    return todoId;
  },
);

// Slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserTodos
      .addCase(getUserTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.todos = action.payload;
        },
      )
      .addCase(getUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })

      // addTodo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })

      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
