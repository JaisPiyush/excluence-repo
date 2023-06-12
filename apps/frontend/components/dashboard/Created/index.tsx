import { Box, Button } from "@mui/material";
import NFTCard from "../../NFTCard";
import { useState, useEffect } from "react";
import ImportCollection from "./ImportCollection";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllMyNFTCollections } from "../../../redux/dashboard";
import { useRouter } from "next/router";

export default function Created() {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useAppDispatch()
    const [createdCollections, fetchedCreatedCollections] = useAppSelector((state) => [state.dashboard.createdCollections,
         state.dashboard.fetchedCreatedCollections]);
    useEffect(() => {
        if(!fetchedCreatedCollections) {
            dispatch(getAllMyNFTCollections())
        }
    },[]);

    const router = useRouter();
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
                    {
                        createdCollections.map((collection, index) => {
                            return <NFTCard key={index} address={collection} onClick={() => {
                                router.push(`/collection/${collection}`)
                            }} />
                        } )
                    }
            </Box>
        </Box>

    </Box>
}