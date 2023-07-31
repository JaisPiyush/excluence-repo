import { SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SubheadingProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function Subheading(props: SubheadingProps) {
    return (
        <Typography
            sx={{
                fontSize: {
                    xl: '2.25rem',
                    lg: '2rem',
                    md: '2rem',
                    sm: '1.75rem',
                    xs: '1.5rem'
                },
                fontWeight: 600,
                ...(props.sx || {})
            }}
        >
            {props.children}
        </Typography>
    );
}
