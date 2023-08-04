import Footer from '@/modules/Footer';
import IndexFeaturesSection from '@/modules/IndexPage/IndexFeaturesSection';
import IndexHeroSection from '@/modules/IndexPage/IndexHeroSection';
import IndexParcelQLSection from '@/modules/IndexPage/IndexParceQLSection';
import NavigationBar from '@/modules/NavigationBar';
import { Box, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Head>
                <title>Excluence</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: `${theme.breakpoints.values.xl}px`
                }}
            >
                <NavigationBar />
                <IndexHeroSection />
                <IndexFeaturesSection />
                <IndexParcelQLSection />
                <Footer />
            </Box>
        </Box>
    );
};

export default Home;
