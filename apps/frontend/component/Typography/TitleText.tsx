import { SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface TitleTextProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function TitleText(props: TitleTextProps) {
    return (
        <Typography
            sx={{
                fontSize: {
                    xl: '7.5rem',
                    lg: '6.5rem',
                    md: '5rem',
                    sm: '2rem',
                    xs: '2rem'
                },
                fontWeight: 'bold',
                lineHeight: 1.25,
                ...(props.sx || {})
            }}
        >
            {props.children}
        </Typography>
    );
}
