import Footer from '@/modules/Footer';
import IndexFeaturesSection from '@/modules/IndexPage/IndexFeaturesSection';
import IndexHeroSection from '@/modules/IndexPage/IndexHeroSection';
import IndexParcelQLSection from '@/modules/IndexPage/IndexParceQLSection';
import NavigationBar from '@/modules/NavigationBar';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <NavigationBar />
            <IndexHeroSection />
            <IndexFeaturesSection />
            <IndexParcelQLSection />
            <Footer />
        </div>
    );
};

export default Home;
