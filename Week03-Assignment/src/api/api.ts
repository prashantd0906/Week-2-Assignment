import axios from "axios";

const USERS_URL = "https://68c9a387ceef5a150f659eb7.mockapi.io/api/v1/users";
const TODOS_URL = "https://68c9a387ceef5a150f659eb7.mockapi.io/api/v1/todos";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number | string;
  gender: string;
  phoneNo: string;
  password: string;
}

// Register
export async function registerUser(user: User): Promise<User> {
  return axios.post<User>(USERS_URL, user).then((res) => res.data);
}

// Login
export async function loginUser(email: string,password: string,): Promise<User | null> {
  return axios.get<User[]>(USERS_URL, {params: {email}}).then((res) => {
    if (!res.data || res.data.length === 0) return null;
    const user = res.data[0];
    return user.password === password ? user : null;
  });
}

// Update user
export async function updateUser(userId: string, user: User): Promise<User> {
  return axios
    .put<User>(`${USERS_URL}/${userId}`, user)
    .then((res) => res.data);
}

// Get user by ID
export async function getUserById(userId: string): Promise<User> {
  return axios.get<User>(`${USERS_URL}/${userId}`).then((res) => res.data);
}

// Todo
export interface Todo {
  id?: string;
  userId: string;
  title: string;
  completed: boolean;
}

// Get todos by userId
export async function getUserTodos(userId: string): Promise<Todo[]> {
  return axios
    .get<Todo[]>(TODOS_URL, {params: {userId}})
    .then((res) => res.data);
}

// Add new todo
export async function addTodo(userId: string, title: string): Promise<Todo> {
  return axios
    .post<Todo>(TODOS_URL, {
      userId,
      title,
      completed: false,
    })
    .then((res) => res.data);
}

// Delete todo
export async function deleteTodo(todoId: string): Promise<void> {
  return axios.delete(`${TODOS_URL}/${todoId}`).then(() => undefined);
}
