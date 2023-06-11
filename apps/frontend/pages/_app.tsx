import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Provider } from 'react-redux'
import {store} from '../redux/store'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Layout } from "./layout";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = ChainId.Mainnet;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <ThirdwebProvider activeChain={activeChain}>
      <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </SessionProvider> 
    </ThirdwebProvider>
    </Provider>
  );
}

export default MyApp;
