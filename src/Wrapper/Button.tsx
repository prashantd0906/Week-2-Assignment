import {Button} from '@mui/material';
import type {ButtonProps} from '@mui/material';

const ButtonWrap: React.FC<ButtonProps> = ({children, ...props}) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
};

export default ButtonWrap;
