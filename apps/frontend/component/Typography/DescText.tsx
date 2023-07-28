import { SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DescTextProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function DescText(props: DescTextProps) {
    return (
        <Typography
            sx={{
                fontSize: {
                    xl: '1.5rem',
                    lg: '1.5rem',
                    md: '1.5rem',
                    sm: '1.25rem',
                    xs: '1.25rem',
                    color: '#8B8B93'
                },
                fontWeight: 500,
                ...(props.sx || {})
            }}
        >
            {props.children}
        </Typography>
    );
}
