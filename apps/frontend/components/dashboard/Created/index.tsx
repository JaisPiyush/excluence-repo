import { Box, ImageList } from "@mui/material";
import NFTCard from "../../NFTCard";

export default function Created() {

    return <Box>
        <ImageList>
        <NFTCard />
        <NFTCard />
        </ImageList>
    </Box>
}