import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#123346',       
      light: '#4E6A7C',      
      dark: '#0A1F29',       
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#FF7043',       
      light: '#FF9861',      
      dark: '#D63D00',      
      contrastText: '#ffffff', 
    },
    background: {
      default: '#F4F6F8',    
      paper: '#ffffff',      
    },
    text: {
      primary: '#ffffff',    
      secondary: '#ffffff',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor:  '#4E6A7C'
            },
          },
        },
      },
    },
  },
});

export default theme;
