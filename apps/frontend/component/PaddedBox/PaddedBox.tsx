import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function PaddedBox({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                paddingX: {
                    xl: '7.5rem',
                    lg: '6rem',
                    sm: '2.75rem',
                    xs: '2rem'
                }
            }}
        >
            {children}
        </Box>
    );
}
