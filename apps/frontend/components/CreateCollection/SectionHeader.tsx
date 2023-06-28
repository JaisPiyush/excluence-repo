import { Box, Typography } from "@mui/material";
import ExButton from "../ExButton";

interface SectionHeaderProps {
    heading: string
    onNexClick: () => void;
    buttonName?: string
}


export default function SectionHeader(props: SectionHeaderProps) {
    return <Box sx={{
        display: 'flex',
        width: '60%',
        justifyContent: 'space-between'
    }}>
        <Typography variant="h4" fontWeight={'600'}>{props.heading}</Typography>
        <ExButton isPrimary
            onClick={props.onNexClick}    
        >{props.buttonName || 'Next'}</ExButton>
    </Box>
}