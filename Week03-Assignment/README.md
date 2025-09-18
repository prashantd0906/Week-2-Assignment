import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axiosInstance from "../api/AxiosClient";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axiosInstance.get("/todos");
  return res.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: {title: string}) => {
    const res = await axiosInstance.post("/todos", todo);
    return res.data;
  },
);

// Delete a todo by id
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axiosInstance.delete(`/todos/${id}`);
    return id;
  },
);

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });
  },
});

export default todosSlice.reducer;


"https://68c9a387ceef5a150f659eb7.mockapi.io/api/v1";