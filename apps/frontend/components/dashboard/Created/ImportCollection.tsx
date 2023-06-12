import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { importNFTCollections } from "../../../redux/dashboard";
import { useState } from "react";

interface ImportCollectionProps {
    open: boolean;
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
  };

export default function ImportCollection(props: ImportCollectionProps) {
    const [address, setAddress] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const handleImportClick = () => {
        if (address !== null) {
            dispatch(importNFTCollections(address))
            props.handleClose();
        }
        
    }
    return <Modal
                open={props.open}
                onClose={() => {props.handleClose()}}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Import NFT Collection
                    </Typography>
                    <TextField value={address} onChange={(e) => {setAddress(e.target.value)}} sx={{marginY: '2rem'}} variant="outlined" placeholder="Paste your collection address" />
                    <Button onClick={() => {handleImportClick()}} variant="contained">Import</Button>

                </Box>
            </Modal>
}