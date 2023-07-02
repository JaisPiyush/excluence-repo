import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/redux-store/index"
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../utility/createEmotionCache";
import darkTheme from "../styles/theme/darkTheme";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import 'react-loading-skeleton/dist/skeleton.css'
import * as fcl from "@onflow/fcl"
import NavBar from "@/modules/NavBar";
// import flowJSON from "@excluence-repo/flow/flow.json"


const clientSideEmotionCache = createEmotionCache();

fcl
  .config()
  .put("accessNode.api", process.env['NEXT_PUBLIC_FLOW_ACCESS_NODE'])
  .put("flow.network", process.env['NEXT_PUBLIC_FLOW_NETWORK'])
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("env", process.env['NEXT_PUBLIC_FLOW_NETWORK'])
  // .load({flowJSON})


function MyApp(props: AppProps & {emotionCache: EmotionCache}) {

  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
  return <Provider store={store}>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <NavBar />
                  <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </Provider>
    
}

export default MyApp;
