import {TextField as MuiTextField} from '@mui/material';
import type {TextFieldProps} from '@mui/material/TextField';

const TextFieldWrap: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField variant="outlined" color="primary" {...props} />;
};

export default TextFieldWrap;
