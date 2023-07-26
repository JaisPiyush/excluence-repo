import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/redux-store/index';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../utility/createEmotionCache';
import darkTheme from '../styles/theme/darkTheme';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import 'react-loading-skeleton/dist/skeleton.css';
import * as fcl from '@onflow/fcl';

// import flowJSON from "@excluence-repo/flow/flow.json"

const clientSideEmotionCache = createEmotionCache();

fcl.config({
    'accessNode.api': process.env['NEXT_PUBLIC_FLOW_ACCESS_NODE'],
    'flow.network': process.env['NEXT_PUBLIC_FLOW_NETWORK'],
    'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
    env: process.env['NEXT_PUBLIC_FLOW_NETWORK']
});

function MyApp(props: AppProps & { emotionCache: EmotionCache }) {
    const {
        Component,
        pageProps,
        emotionCache = clientSideEmotionCache
    } = props;
    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />

                    <Box>
                        <Component {...pageProps} />
                    </Box>
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    );
}

export default MyApp;
