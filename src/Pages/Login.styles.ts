import { styled } from '@mui/system';
import { Box, Paper, Button, Typography, TextField } from '@mui/material';

// Background
export const BackgroundBox = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
}));

// Container
export const LoginPaper = styled(Paper)(() => ({
  padding: '32px',
}));

// Typography
export const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  marginBottom: '8px',
}));

export const Subtitle = styled(Typography)(() => ({
  marginBottom: '24px',
}));

export const ErrorText = styled(Typography)(() => ({
  color: 'red',
  marginBottom: '16px',
}));

// TextField
export const StyledTextField = styled(TextField)(() => ({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
  },
}));

// Button
export const LoginButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: 8,
  padding: '10px 0',
}));
