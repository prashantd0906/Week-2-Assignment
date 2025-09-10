import {Box, ListItem, ListItemText} from '@mui/material';
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
  DashboardTitle,
  DeleteButton,
  HeaderBox,
  LogoutButton,
  SectionTitle,
  StyledDivider,
  StyledList,
  SubmitButton,
  TaskStack,
  TaskTextField,
} from './Todos.styles';

// Validation
const schema = Yup.object({
  todos: Yup.array()
    .of(Yup.string().required('Task is required'))
    .min(3, 'Task must be at least 3 characters')
    .max(50, 'Task cannot exceed 50 characters'),
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
      <HeaderBox>
        <DashboardTitle variant="h5">Todo Dashboard</DashboardTitle>
        <LogoutButton variant="outlined" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </HeaderBox>

      <CardBox elevation={3}>
        <SectionTitle variant="h6">API Todos (fetched)</SectionTitle>
        <StyledDivider />
        <StyledList>
          {apiTodos.map((task, i) => (
            <ListItem key={i}>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </StyledList>
      </CardBox>

      <CardBox elevation={3}>
        <SectionTitle variant="h6">Add Your Todos</SectionTitle>
        <StyledDivider />

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
                            variant="outlined"
                            onClick={() => remove(index)}
                          >
                            Remove
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
      </CardBox>

      {submittedTodos.length > 0 && (
        <CardBox elevation={3}>
          <SectionTitle variant="h6">Submitted Todos</SectionTitle>
          <StyledDivider />
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
