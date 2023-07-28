import { SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DivHeadingProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function DivHeading(props: DivHeadingProps) {
    return (
        <Typography
            sx={{
                fontSize: {
                    xl: '3rem',
                    lg: '2.75rem',
                    md: '2.75rem',
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
