import type {PaletteMode} from '@mui/material';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {useMemo, useState} from 'react';
import ButtonWrap from '../Wrapper/Button';

const Toggle = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#e91e63',
          },
        },
      }),
    [mode],
  );

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{padding: '2rem', textAlign: 'center'}}>
        <h2>Hello, MUI Theme!</h2>
        <p>Current Mode: {mode}</p>

        <ButtonWrap onClick={toggleMode}>Toggle</ButtonWrap>
      </div>
    </ThemeProvider>
  );
};

export default Toggle;
