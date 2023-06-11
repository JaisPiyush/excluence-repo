import { Box, Typography } from "@mui/material";
import WalletButton from "../WalletButton";

export function Header() {
    return <Box sx={{
        width: '100vw',
        paddingY: '1rem',
        paddingX: '1.5rem',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }}>
        <WalletButton />
        <Typography variant="h3" >EXCLUENCE</Typography>
    </Box>
}