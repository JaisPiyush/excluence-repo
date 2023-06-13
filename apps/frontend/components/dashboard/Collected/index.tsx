import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import NFTCard from "../../NFTCard";

export default function Collected() {


    const router = useRouter();
    return <Box >
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    <NFTCard address="0xc9d8f15803c645e98b17710a0b6593f097064bef" isCollected={true} />
            </Box>
        </Box>

    </Box>
}