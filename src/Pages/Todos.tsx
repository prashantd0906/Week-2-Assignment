import {useEffect, useState} from 'react';
import axios from 'axios';
import {Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';
import {
  Container,
  HeaderBox,
  StyledList,
  TaskStack,
  TaskTextField,
  DeleteButton,
  AddButton,
  SubmitButton,
  Typography,
  ListItem,
  ListItemText,
  Box,
} from './Todos.styles';

// Validation
const schema = Yup.object({
  todos: Yup.array()
    .of(Yup.string().required('Task is required'))
    .min(1, 'Add at least one task'),
});

const initialValues = {
  //initial value
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
    // Fetch from API
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
      <HeaderBox>
        <Typography variant="h5">Todo List</Typography>
        <DeleteButton variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </DeleteButton>
      </HeaderBox>

      <Typography variant="h6" gutterBottom>
        API Todos (fetched):
      </Typography>
      <StyledList>
        {apiTodos.map((task, i) => (
          <ListItem key={i}>
            <ListItemText primary={task} />
          </ListItem>
        ))}
      </StyledList>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, {resetForm}) => {
          setSubmittedTodos(values.todos); // store submitted todos
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
                          Delete
                        </DeleteButton>
                      </TaskStack>
                    ))}

                    <AddButton variant="contained" onClick={() => push('')}>
                      Add Task
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

      {submittedTodos.length > 0 && (
        <>
          <Typography variant="h6" sx={{mt: 3}}>
            Submitted Todos:
          </Typography>
          <StyledList>
            {submittedTodos.map((task, i) => (
              <ListItem key={i}>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </StyledList>
        </>
      )}
    </Container>
  );
}
