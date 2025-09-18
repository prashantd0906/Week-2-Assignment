export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS:
    "Registration successful! You can now edit your profile below.",
  UPDATE_SUCCESS: "Profile updated successfully!",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logged out successfully",
  TODO_ADDED: "Todo added successfully",
  TODO_DELETED: "Todo deleted successfully",
};

export const ERROR_MESSAGES = {
  REGISTRATION_FAILED: "Registration failed",
  UPDATE_FAILED: "Update failed",
  INVALID_CREDENTIALS: "Invalid credentials. Please register first.",
  GENERAL_ERROR: "Something went wrong. Please try again.",
};

export const TODO_MESSAGES = {
  EMPTY_ERROR: "Todo cannot be empty. Please enter at least 1 character.",
  FETCH_FAILED: "Failed to fetch todos",
  ADD_FAILED: "Failed to add todo",
  ADD_ERROR: "Error adding todo",
  DELETE_FAILED: "Failed to delete todo",
  NO_TODOS: "No todos yet. Add one above!",
  LOADING: "Loading...",
};

export const FIELD_LABELS: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  age: "Age",
  gender: "Gender",
  phoneNo: "Phone Number",
  password: "Password",
  newTodo: "New Todo",
};

export const BUTTON_TEXT = {
  REGISTER: "Register",
  REGISTERING: "Registering...",
  UPDATE: "Update Profile",
  UPDATING: "Updating...",
  LOGIN: "Login",
  LOGGING_IN: "Logging in...",
  LOGOUT: "Logout",
  ADD_TODO: "Add",
  DELETE_TODO: "Delete",
};

export const TITLES = {
  LOGIN: "Login",
  REGISTER: "Register",
  EDIT_PROFILE: "Edit Profile",
  TODOS: "Your Todos",
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  CURRENT_USER_ID: "currentUserId",
};
