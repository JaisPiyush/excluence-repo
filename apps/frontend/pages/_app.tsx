import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@redux-store/index"
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
      'sans-serif'
    ].join(',')
  },
  palette: {
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

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
    
}

export default MyApp;
