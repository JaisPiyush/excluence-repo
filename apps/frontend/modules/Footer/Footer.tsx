import { Box, IconButton, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import ExcluenceLogo from '../../public/img/excluence-logo.png';
import { FaDiscord } from 'react-icons/fa';
import { SiReadthedocs } from 'react-icons/si';
import { AiOutlineMail } from 'react-icons/ai';

//TODO: Add onclick fns to discord, docs and email

/* eslint-disable @typescript-eslint/no-unused-vars */
interface FooterProps {}

const iconSx: SxProps = {
    marginRight: '1.5rem'
};

export default function Footer(props: FooterProps) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: {
                    xs: '40%',
                    lg: '16%'
                }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '58%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Image width={112} height={96} src={ExcluenceLogo} alt="logo" />
                <Typography
                    sx={{
                        marginTop: {
                            lg: '2rem',
                            xs: '1rem'
                        }
                    }}
                    variant="h5"
                >
                    Excluence
                </Typography>
                <Typography
                    sx={{
                        marginTop: {
                            lg: '20.5rem',
                            xs: '18.25rem'
                        }
                    }}
                    variant="body2"
                >
                    For any query, suggestion, idea, partnership, feedback or
                    bug report contact directly on discord or email.
                </Typography>
                <Box
                    sx={{
                        width: 'auto',
                        display: 'flex',
                        marginTop: '2rem'
                    }}
                >
                    <IconButton sx={iconSx}>
                        <FaDiscord color="secondary.light" />
                    </IconButton>
                    <IconButton sx={iconSx}>
                        <SiReadthedocs color="secondary.light" />
                    </IconButton>
                    <IconButton sx={iconSx}>
                        <AiOutlineMail color="secondary.light" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
