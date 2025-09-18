import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
  Button,
  Card,
  Container,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {type Todo, addTodo, deleteTodo, getUserTodos} from "../api/api";

export default function TodosPage() {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    localStorage.getItem("currentUserId"),
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos for current user
  const fetchTodos = () => {
    if (!currentUserId) return;

    setLoadingTodos(true);
    setError(null);

    getUserTodos(currentUserId)
      .then((data) => setTodos(data))
      .catch(() => setError("Failed to fetch todos"))
      .finally(() => setLoadingTodos(false));
  };

  useEffect(() => {
    if (!currentUserId) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [currentUserId, navigate]);

  const handleAddTodo = () => {
    if (!currentUserId) return;

    if (!title.trim()) {
      setError("Todo cannot be empty. Please enter at least 1 character.");
      return;
    }

    setAddingTodo(true);
    setError(null);

    addTodo(currentUserId, title.trim())
      .then((newTodo) => {
        if (newTodo && newTodo.id) {
          setTodos((prev) => [...prev, newTodo]);
          setTitle("");
        } else {
          setError("Failed to add todo");
        }
      })
      .catch(() => setError("Error adding todo"))
      .finally(() => setAddingTodo(false));
  };

  const handleDelete = (todoId: string) => {
    if (!todoId) return;

    setError(null);

    deleteTodo(todoId)
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
      })
      .catch(() => setError("Failed to delete todo"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    setCurrentUserId(null);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" style={{marginTop: "2rem"}}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Your Todos</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="New Todo"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddTodo}
          disabled={addingTodo || !currentUserId}
        >
          Add
        </Button>
      </Stack>

      {loadingTodos ? (
        <Typography>Loading...</Typography>
      ) : todos.length === 0 ? (
        <Typography>No todos yet. Add one above!</Typography>
      ) : (
        todos.map((todo) => (
          <Card key={todo.id} style={{marginBottom: "10px", padding: "10px"}}>
            <ListItem
              secondaryAction={
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(todo.id!)}
                >
                  Delete
                </Button>
              }
            >
              <ListItemText primary={todo.title} />
            </ListItem>
          </Card>
        ))
      )}
    </Container>
  );
}
