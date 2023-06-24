import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@redux-store/index"
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../utility/createEmotionCache";
import darkTheme from "../styles/theme/darkTheme";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";


const clientSideEmotionCache = createEmotionCache();



function MyApp(props: AppProps & {emotionCache: EmotionCache}) {

  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
  return <Provider store={store}>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </Provider>
    
}

export default MyApp;
