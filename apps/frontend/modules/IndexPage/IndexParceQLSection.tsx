import PaddedBox from '@/component/PaddedBox';
import {
    Box,
    Divider,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ParcelQLImage from '../../public/img/parcelQL-code.png';
import Image from 'next/image';

export default function IndexParcelQLSection() {
    const theme = useTheme();
    const isServer = typeof window === 'undefined';
    const isMd = useMediaQuery(theme.breakpoints.up('md')) || isServer;
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                pb: isMd ? '0px' : '5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <PaddedBox>
                <Box
                    sx={{
                        width: '95%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: isMd ? 'row' : 'column-reverse',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Image
                            width={456}
                            height={256}
                            src={ParcelQLImage}
                            alt="parcelQL"
                            style={{
                                marginTop: isMd ? '2rem' : '4rem',
                                width: isMd ? 456 : '100%'
                            }}
                        />
                        <Box
                            sx={{
                                width: {
                                    xl: '688px',
                                    lg: '575px',
                                    xs: '100%'
                                },
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="h3">ParcelQL</Typography>
                            <Box sx={{ width: '100%', height: '32px' }}></Box>
                            <Typography variant="h5">
                                ParcelQL is a restricted SQL query as a JSON. It
                                has support for queries like simple data
                                filtration, sorting to complex queries like
                                aggregation functions, window functions, etc.
                                Using ParcelQL developer can build apps like
                                marketplace, defi, a marketplace aggregator like
                                OpenSea Pro, NFT tools like icy.tools, and many
                                more just by writing queries.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: {
                                md: '120px',
                                xs: '80px'
                            }
                        }}
                    ></Box>
                    <Divider sx={{ width: '100%', bgcolor: 'primary.main' }} />
                </Box>
            </PaddedBox>
        </Box>
    );
}
