import { Box, Button, InputAdornment, TextField } from "@mui/material";
import {Delete} from "react-iconly"

interface RoyaltyShareInputProps {
    address: string;
    cut: string;
    setAddress: (address: string) => void
    setCut: (cut: string) => void
    removeClick: () => void
}

export default function RoyaltyShareInput(props: RoyaltyShareInputProps) {

    const handleOnDeleteClick = () => {
        props.removeClick()
    }

    return <Box sx={{
        width: '60%',
        display: 'flex',
        marginTop: '1rem'
    }}>
        <TextField 
            variant="outlined" 
            required
            error={props.address.length == 0}
            sx={{
                width: '60%',
            }}
            placeholder="Please enter an address"
            value={props.address}
            onChange={(e) => {
                props.setAddress(e.target.value)
            }}
        />
        <TextField
            variant="outlined" 
            required
            error={props.cut.length > 0 && parseFloat(props.cut) > 100}
            InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
            sx={{
                width: '15%',
                marginLeft: '1rem',
                marginRight: '1rem'
            }}
            value={props.cut}
            onChange={(e) => {
                props.setCut(e.target.value)
            }}
        />
        <Button

            onClick={() => {handleOnDeleteClick()}}
        >
            <Delete set="light" primaryColor="blueviolet"/>
        </Button>
    </Box>
}