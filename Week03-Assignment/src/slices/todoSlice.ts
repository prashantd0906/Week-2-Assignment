import {type PayloadAction, createSlice} from "@reduxjs/toolkit";

interface Todo {
  id: number;
  task: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {id: Date.now(), task: action.payload};
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    clearTodos: (state) => {
      state.todos = [];
      localStorage.removeItem("todos");
    },
  },
});

export const {addTodo, deleteTodo, clearTodos} = todoSlice.actions;
export default todoSlice.reducer;
