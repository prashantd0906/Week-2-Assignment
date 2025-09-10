import {Box, Paper, Button} from '@mui/material';
import {styled} from '@mui/material/styles';

export const BackgroundBox = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
  padding: '16px',
}));

export const LoginPaper = styled(Paper)(() => ({
  // Card container
  padding: '32px',
  borderRadius: '16px',
  textAlign: 'center',
  backdropFilter: 'blur(8px)',
}));

export const LoginButton = styled(Button)(() => ({
  // Gradient button
  marginTop: '16px',
  padding: '12px',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '12px',
  textTransform: 'none',
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  transition: '0.3s',
  '&:hover': {
    background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
    transform: 'scale(1.02)',
  },
}));
