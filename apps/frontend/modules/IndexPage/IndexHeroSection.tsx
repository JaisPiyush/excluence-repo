import { Box, Button, Typography } from '@mui/material';
import HeroBg from '../../public/img/hero-bg.png';
import PaddedBox from '@/component/PaddedBox';

export default function IndexHeroSection() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${HeroBg.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <PaddedBox>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h1">
                        Query blockchain events using{' '}
                        <span style={{ color: '#69FEB6' }}>SQL</span>
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: '64px'
                        }}
                    ></Box>
                    <Button
                        variant="contained"
                        sx={{
                            paddingX: '1rem',
                            paddingY: '0.5rem'
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </PaddedBox>
        </Box>
    );
}
