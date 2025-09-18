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
import {
  BUTTON_TEXT,
  FIELD_LABELS,
  TITLES,
  TODO_MESSAGES,
} from "../constants/messages";

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
      .catch(() => setError(TODO_MESSAGES.FETCH_FAILED))
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
      setError(TODO_MESSAGES.EMPTY_ERROR);
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
          setError(TODO_MESSAGES.ADD_FAILED);
        }
      })
      .catch(() => setError(TODO_MESSAGES.ADD_ERROR))
      .finally(() => setAddingTodo(false));
  };

  const handleDelete = (todoId: string) => {
    if (!todoId) return;

    setError(null);

    deleteTodo(todoId)
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
      })
      .catch(() => setError(TODO_MESSAGES.DELETE_FAILED));
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
        <Typography variant="h4">{TITLES.TODOS}</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          {BUTTON_TEXT.LOGOUT}
        </Button>
      </Stack>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label={FIELD_LABELS.newTodo}
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddTodo}
          disabled={addingTodo || !currentUserId}
        >
          {BUTTON_TEXT.ADD_TODO}
        </Button>
      </Stack>

      {loadingTodos ? (
        <Typography>{TODO_MESSAGES.LOADING}</Typography>
      ) : todos.length === 0 ? (
        <Typography>{TODO_MESSAGES.NO_TODOS}</Typography>
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
                  {BUTTON_TEXT.DELETE_TODO}
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
