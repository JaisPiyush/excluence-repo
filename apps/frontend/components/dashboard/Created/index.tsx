import { Box, Button, ImageList } from "@mui/material";
import NFTCard from "../../NFTCard";
import { useState } from "react";
import ImportCollection from "./ImportCollection";

export default function Created() {
    const [openModal, setOpenModal] = useState(false)

    return <Box >
            <Box sx={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem'
            }}>
                <Button onClick={() => {
                    setOpenModal(true)
                }} variant="contained">Import Collection</Button>
                <ImportCollection open={openModal} handleClose={() => {setOpenModal(false)}} />
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    width: '80%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
            </Box>
        </Box>

    </Box>
}