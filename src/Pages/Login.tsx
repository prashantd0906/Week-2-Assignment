import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';
import {
  BackgroundBox,
  LoginPaper,
  Title,
  Subtitle,
  ErrorText,
  StyledTextField,
  LoginButton,
} from './Login.styles';
import {Container} from '@mui/material';

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    login();
    navigate('/todos');
  };

  return (
    <BackgroundBox>
      <Container maxWidth="xs">
        <LoginPaper elevation={6}>
          <Title variant="h4">Welcome Back 👋</Title>
          <Subtitle variant="body2" color="text.secondary">
            Please login to continue
          </Subtitle>

          <form onSubmit={handleSubmit}>
            {error && <ErrorText variant="body2">{error}</ErrorText>}

            <StyledTextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              variant="outlined"
            />

            <StyledTextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              variant="outlined"
            />

            <LoginButton type="submit" variant="contained" fullWidth>
              Login
            </LoginButton>
          </form>
        </LoginPaper>
      </Container>
    </BackgroundBox>
  );
};

export default Login;
