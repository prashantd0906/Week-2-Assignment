import {Box, Button, List, Paper, Stack, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';

// Main container
export const Container = styled(Box)(() => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '24px',
}));

// Header
export const HeaderBox = styled(Box)(() => ({
  background: 'linear-gradient(90deg, #667eea, #764ba2)',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '32px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

// Styled list
export const StyledList = styled(List)(() => ({
  maxHeight: 200,
  overflowY: 'auto',
}));

// Stack for each task input + button
export const TaskStack = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
}));

// Task input
export const TaskTextField = styled(TextField)(() => ({
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}));

// Buttons
export const DeleteButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: '8px',
}));

export const AddButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: '8px',
  marginTop: '16px',
}));

export const SubmitButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: '10px',
  marginTop: '24px',
  padding: '10px 20px',
  fontWeight: 'bold',
}));

// Card wrapper for sections
export const CardBox = styled(Paper)(() => ({
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '32px',
}));
