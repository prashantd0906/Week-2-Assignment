import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import type {Theme} from '@mui/material';
import {styled} from '@mui/material/styles';

export const Container = styled(Paper)(({theme}: {theme: Theme}) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
}));

export const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
});

export const StyledList = styled(List)({
  marginBottom: 24,
});

export const TaskStack = styled(Stack)({
  marginBottom: 16,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const TaskTextField = styled(TextField)({
  flex: 1,
});

export const DeleteButton = styled(Button)({
  minWidth: 'auto',
});

export const AddButton = styled(Button)({
  marginBottom: 16,
});

export const SubmitButton = styled(Button)({
  width: '100%',
});

export {Typography, Button, ListItem, ListItemText, Box};
