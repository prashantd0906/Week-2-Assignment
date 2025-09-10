import {Box, Divider, ListItem, ListItemText, Typography} from '@mui/material';
import axios from 'axios';
import {FieldArray, Form, Formik} from 'formik';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useAuth} from '../auth/AuthContext';
import {
  AddButton,
  CardBox,
  Container,
  DeleteButton,
  HeaderBox,
  StyledList,
  SubmitButton,
  TaskStack,
  TaskTextField,
} from './Todos.styles';

// Validation
const schema = Yup.object({
  todos: Yup.array()
    .of(Yup.string().required('Task is required'))
    .min(1, 'Add at least one task'),
});

const initialValues = {
  todos: [''],
};

export default function TodoForm() {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const [apiTodos, setApiTodos] = useState<string[]>([]);
  const [submittedTodos, setSubmittedTodos] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/login', {replace: true});
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?_limit=5',
        );
        const fetched = res.data.map((t: {title: string}) => t.title);
        setApiTodos(fetched);
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };
    fetchTodos();
  }, []);

  return (
    <Container>
      {/* Header */}
      <HeaderBox>
        <Typography variant="h5" fontWeight="bold">
          Todo Dashboard
        </Typography>
        <DeleteButton variant="outlined" color="inherit" onClick={handleLogout}>
          Logout
        </DeleteButton>
      </HeaderBox>

      {/* API Todos */}
      <CardBox elevation={3}>
        <Typography variant="h6" gutterBottom>
          API Todos (fetched)
        </Typography>
        <Divider sx={{mb: 2}} />
        <StyledList>
          {apiTodos.map((task, i) => (
            <ListItem key={i}>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </StyledList>
      </CardBox>

      {/* Form Section */}
      <CardBox elevation={3}>
        <Typography variant="h6" gutterBottom>
          Add Your Todos
        </Typography>
        <Divider sx={{mb: 2}} />

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, {resetForm}) => {
            setSubmittedTodos(values.todos);
            resetForm();
          }}
        >
          {({values, errors, touched, handleChange, handleBlur}) => {
            const todosTouched = touched.todos as boolean[] | undefined;
            const todosErrors = errors.todos as string[] | undefined;

            return (
              <Form>
                <FieldArray name="todos">
                  {({push, remove}) => (
                    <Box>
                      {values.todos.map((todo, index) => (
                        <TaskStack key={index}>
                          <TaskTextField
                            label={`Task ${index + 1}`}
                            name={`todos[${index}]`}
                            value={todo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              todosTouched?.[index] && todosErrors?.[index],
                            )}
                            helperText={
                              todosTouched?.[index] && todosErrors?.[index]
                            }
                          />
                          <DeleteButton
                            color="error"
                            variant="outlined"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </DeleteButton>
                        </TaskStack>
                      ))}

                      <AddButton variant="contained" onClick={() => push('')}>
                        ➕ Add Task
                      </AddButton>
                    </Box>
                  )}
                </FieldArray>

                <SubmitButton type="submit" variant="contained">
                  Submit
                </SubmitButton>
              </Form>
            );
          }}
        </Formik>
      </CardBox>

      {/* Submitted Todos */}
      {submittedTodos.length > 0 && (
        <CardBox elevation={3}>
          <Typography variant="h6" gutterBottom>
            Submitted Todos
          </Typography>
          <Divider sx={{mb: 2}} />
          <StyledList>
            {submittedTodos.map((task, i) => (
              <ListItem key={i}>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </StyledList>
        </CardBox>
      )}
    </Container>
  );
}
