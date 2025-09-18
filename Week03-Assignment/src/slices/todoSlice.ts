import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Todo, addTodo as apiAddTodo, deleteTodo as apiDeleteTodo, getUserTodos as apiGetUserTodos } from "../api/api";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

// Slice state
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  success: null,
};

export const getUserTodos = createAsyncThunk<Todo[], string>(
  "todos/getUserTodos",
  async (userId) => {
    return await apiGetUserTodos(userId);
  }
);

export const addTodo = createAsyncThunk<Todo, { userId: string; title: string }>(
  "todos/addTodo",
  async ({ userId, title }) => {
    return await apiAddTodo(userId, title);
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (todoId) => {
    await apiDeleteTodo(todoId);
    return todoId;
  }
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
        state.success = null;
      })
      .addCase(getUserTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ERROR_MESSAGES.FETCH_TODOS_FAILED;
      })

      // addTodo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.success = SUCCESS_MESSAGES.TODO_ADDED;
      })

      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
        state.success = SUCCESS_MESSAGES.TODO_DELETED;
      });
  },
});

export default todoSlice.reducer;
