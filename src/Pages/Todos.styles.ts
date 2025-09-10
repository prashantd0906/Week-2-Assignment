import {
  Box,
  Button,
  Divider,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type {Theme} from '@mui/material/styles';
import {styled} from '@mui/system';

// Divider
export const StyledDivider = styled(Divider)(({theme}: {theme: Theme}) => ({
  marginBottom: theme.spacing(2),
}));

// Card container
export const CardBox = styled(Paper)(({theme}: {theme: Theme}) => ({
  padding: theme.spacing(3),
  borderRadius: (theme.shape.borderRadius as number) * 2,
  marginBottom: theme.spacing(4),
}));

// Container
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

// List
export const StyledList = styled(List)(() => ({
  maxHeight: 200,
  overflowY: 'auto',
}));

// Typography
export const DashboardTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
}));

export const SectionTitle = styled(Typography)(() => ({
  marginBottom: '8px',
}));

// Task stack
export const TaskStack = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
}));

// Text field
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

// Logout
export const LogoutButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: '8px',
  borderColor: 'white',
  color: 'white',
  '&:hover': {backgroundColor: 'rgba(255,255,255,0.2)'},
}));
