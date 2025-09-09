import {useState} from 'react';
import {useAuth} from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Button, Container, TextField, Typography, Paper} from '@mui/material';

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
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{p: 4, mt: 8, borderRadius: 3}}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
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
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{mb: 2}}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{mt: 3}}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
