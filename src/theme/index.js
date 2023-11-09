import { createTheme, colors } from '@material-ui/core';
import shadows from './shadow';
import typography from './typography';

const theme = createTheme({
  palette: {

    background: {
      default: '#6B8E23',
      paper: colors.common[100]
    },
    primary: {

      contrastText: '#ffffff',
      main: '#9FB874'
    },
    customColor: {
      contrastText: '#000000',
      main: '#9FB874',
    },
    text: {
      primary: '#6fa345',
      secondary: '#111111'
    },
  },
  shadows,
  typography
});

export default theme;
