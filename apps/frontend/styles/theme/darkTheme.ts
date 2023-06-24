import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    typography: {
      fontFamily: [
        'Work Sans',
        'sans-serif'
      ].join(',')
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#A259FF'
        },
        secondary: {
            main: '#2B2B2B',
            light: '#3B3B3B'
        }
    },
    breakpoints: {
      values: {
         xs: 0,
         sm: 600,
         md: 834,
         lg: 1280,
         xl: 1536,
      }
    }
  })

export default darkTheme