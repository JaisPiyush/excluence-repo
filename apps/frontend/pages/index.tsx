import IndexHeroSection from '@/modules/IndexPage/IndexHeroSection';
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
            <IndexHeroSection />
        </div>
    );
};

export default Home;
