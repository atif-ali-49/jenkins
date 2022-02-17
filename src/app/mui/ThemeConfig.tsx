import { createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';

export let ThemeConfig = createMuiTheme({
  
  palette: {
    type: "light",
    common:{
      black: '#000',
      white: '#fff'
    },
    background: {
      default: "rgb(247, 249, 252)",
      paper: "#fff"
    },
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
    error: {
      light: '#fa3737',
      main: '#b70606',
      dark: '#e80000'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#ff9800'
    },
    info: {
      light: '#34beff',
      main: '#01aeff',
      dark: '#0093d8'
    },
    success: {
      light: '#51dd65',
      main: '#39b54a',
      dark: '#229a33'
    },
    text: {
      primary: '#3a3a3a',
      secondary: '#6b778c',
      disabled: 'rgba(0,0,0,0.38)',
      hint: '#a0a5b9'
    },   
  },
  
  typography: {
    fontSize: 14,
    // htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
     
    },
    button: {
      minWidth: 145,
      fontSize: '0.875rem',
      textTransform: 'none',
      lineHeight: 2,
    },
    
    fontFamily: [
      '"Roboto"',
      '"Segoe UI Regular"',
      '"Segoe UI Light"',
      '"Segoe UI Semibold"',
      '"Al Bayan Plain"',
      '"Arial"',
      '"Segoe UI Bold"',
      '"Segoe UI Symbol"',
      '"Segoe UI Emoji"',
      '"-apple-system"',
      '"BlinkMacSystemFont"',
      '"Segoe UI"',
      '"Helvetica Neue"',
      '"Arial"',
      '"sans-serif"',
      '"Apple Color Emoji"',
      'sans-serif'
      
    ].join(','),
  },
  
  overrides: {

    MuiButton: {
      text: {
        color: 'white',
        root: {
          fontSize: '.875rem',
        }
      },
      
    },

    MuiFormLabel: {
      asterisk: {
        color: '#ff0000',
      },
    },

    //overriding typography
    MuiTypography:{
      h1:{
  
      }
    }

  }
  
});

ThemeConfig = responsiveFontSizes(ThemeConfig);
