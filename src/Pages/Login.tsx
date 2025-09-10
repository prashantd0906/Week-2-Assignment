import {Container, TextField, Typography} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';
import {BackgroundBox, LoginButton, LoginPaper} from './Login.styles';

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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
            Please login to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            {error && (
              <Typography color="error" variant="body2" sx={{mb: 2}}>
                {error}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{mb: 2}}
              variant="outlined"
              InputProps={{sx: {borderRadius: 2}}}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{mb: 3}}
              variant="outlined"
              InputProps={{sx: {borderRadius: 2}}}
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
