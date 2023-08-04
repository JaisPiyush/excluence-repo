import PaddedBox from '@/component/PaddedBox';
import {
    useMediaQuery,
    useTheme,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import Logo from '../../public/img/excluence-logo.png';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFiletypeDoc } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { DISCORD_URL, DOCS_URL, EMAIL_URL } from '@/utility/constants';

enum SocialButtonType {
    Discord,
    Docs,
    Email
}

export default function Footer() {
    const theme = useTheme();
    const isServer = typeof window === 'undefined';
    const isMd = useMediaQuery(theme.breakpoints.up('md')) || isServer;

    const router = useRouter();

    const _handleSocialClick = (socialType: SocialButtonType) => {
        switch (socialType) {
            case SocialButtonType.Discord:
                router.push(DISCORD_URL);
                return;
            case SocialButtonType.Docs:
                router.push(DOCS_URL);
                return;
            case SocialButtonType.Email:
                router.push(EMAIL_URL);
                return;
        }
    };

    const handleSocialClick = (socialType: SocialButtonType) => {
        return () => {
            _handleSocialClick(socialType);
        };
    };

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
                    <Image width={104} height={88} src={Logo} alt="logo" />
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Excluence
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: {
                                md: '120px',
                                xs: '180px'
                            }
                        }}
                    ></Box>
                    <Typography variant="body1">
                        For any query, suggestion, idea, partnership, feedback
                        or bug report contact directly on discord or email.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: '0.5rem' }}>
                        Email: iampiyushjaiswal103@gmail.com,
                        business@excluence.com
                    </Typography>
                    <Box sx={{ display: 'flex', mt: '1.5rem' }}>
                        <IconButton
                            sx={{ mx: '1rem' }}
                            onClick={handleSocialClick(
                                SocialButtonType.Discord
                            )}
                        >
                            <FaDiscord color="white" />
                        </IconButton>
                        <IconButton
                            sx={{ mx: '1rem' }}
                            onClick={handleSocialClick(SocialButtonType.Docs)}
                        >
                            <BsFiletypeDoc color="white" />
                        </IconButton>
                        <IconButton
                            sx={{ mx: '1rem' }}
                            onClick={handleSocialClick(SocialButtonType.Email)}
                        >
                            <AiOutlineMail color="white" />
                        </IconButton>
                    </Box>
                </Box>
            </PaddedBox>
        </Box>
    );
}
