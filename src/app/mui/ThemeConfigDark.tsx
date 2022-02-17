import { createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';

export let ThemeConfigDark = createMuiTheme({
  // rgb(22, 28, 36)
  palette: {
    type: "dark",
    primary: {
      light: '#f7c98c',
      main: '#ef9318',
      dark: '#f4b700',
      contrastText: '#fff'
   },
      secondary: {
      light: '#3a3a3a',
      main: '#292929',
      dark: '#060606',
      contrastText: '#fff'
    },
  //   common:{
  //     black: '#000',
  //     white: '#fff'
  //   },
  //   background: {
  //     default: "rgb(22, 28, 36)",
  //     paper: "rgb(33, 43, 54)"
  //   },
  //   primary: {
  //     light: '#303030',
  //     main: 'rgb(22, 28, 36)',
  //     dark: '#303030',
  //     contrastText: '#fff'
  //  },
  //   secondary: {
  //     light: '#3a3a3a',
  //     main: '#292929',
  //     dark: '#060606',
  //     contrastText: '#fff'
  //   },
  //   error: {
  //     light: '#fa3737',
  //     main: '#b70606',
  //     dark: '#e80000'
  //   },
  //   warning: {
  //     light: '#ffb74d',
  //     main: '#ff9800',
  //     dark: '#ff9800'
  //   },
  //   info: {
  //     light: '#34beff',
  //     main: '#01aeff',
  //     dark: '#0093d8'
  //   },
  //   success: {
  //     light: '#51dd65',
  //     main: '#39b54a',
  //     dark: '#229a33'
  //   },
  //   text: {
  //     primary: '#fff',
  //     secondary: '#6b778c',
  //     disabled: 'rgba(0,0,0,0.38)',
  //     hint: '#a0a5b9'
  //   },   
  },

  
  // overrides: {
  //   MuiFormLabel: {
  //     asterisk: {
  //       color: '#ff0000',
  //     },
  //   },

  // }
  
});

ThemeConfigDark = responsiveFontSizes(ThemeConfigDark);
