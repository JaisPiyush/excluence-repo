import { Box, Typography } from "@mui/material"
import ExButton from "../ExButton"

interface ContractCardProps {
    name: string
    onClick?: (name: string) => void
}

export default function ContractCard(props: ContractCardProps) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.name)
        }
    }
    return <Box sx={{
        border: '3px solid',
        borderColor: 'secondary.light',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginX: '0.5rem',
        marginY: '0.25rem',
        paddingY: '3rem',
        paddingX: '5rem'
    }} 

    
    
    >
        <Typography variant="h6" fontWeight={'regular'}>{props.name}</Typography>
        <ExButton onClick={() => {handleClick()}} sx={{marginTop: '1rem'}} isPrimary={false}>Import</ExButton>
    </Box>
}