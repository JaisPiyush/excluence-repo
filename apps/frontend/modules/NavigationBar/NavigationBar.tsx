import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Logo from '../../public/img/excluence-logo.png';
import Image from 'next/image';
import PaddedBox from '@/component/PaddedBox';
import { useRouter } from 'next/router';
import { DOCS_URL } from '@/utility/constants';

export default function NavigationBar() {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const router = useRouter();
    const handleOnDocsClick = () => {
        router.push(DOCS_URL);
    };
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: `${theme.breakpoints.values.xl}px`,
                position: 'fixed',
                zIndex: 10
            }}
        >
            <PaddedBox>
                <Box
                    sx={{
                        width: '100%',
                        height: {
                            lg: '64px',
                            sm: '36px',
                            xs: '24px'
                        },
                        bgcolor: 'black',
                        border: `1px solid`,
                        borderColor: 'primary.main',
                        display: 'flex',
                        paddingX: '1rem',
                        paddingY: '0.5rem',
                        borderRadius: '0.5rem',
                        marginTop: {
                            lg: '44px',
                            xs: '16px'
                        },
                        alignItems: 'center'
                    }}
                >
                    <Image
                        width={36}
                        height={36}
                        src={Logo}
                        alt="logo"
                        style={{
                            width: isMd ? 36 : 22,
                            height: isMd ? 36 : 22
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            cursor: 'pointer',
                            ml: {
                                lg: '8px',
                                xs: '4px'
                            }
                        }}
                    >
                        Excluence
                    </Typography>
                    <Button
                        sx={{
                            ml: {
                                lg: '32px',
                                xs: '8px'
                            }
                        }}
                        onClick={() => {
                            handleOnDocsClick();
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            Docs
                        </Typography>
                    </Button>
                </Box>
            </PaddedBox>
        </Box>
    );
}
