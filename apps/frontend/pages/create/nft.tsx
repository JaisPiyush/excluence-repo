import CreateNFTForm from "@/modules/CreateNFT/CreateNFTForm";
import NFTPreview from "@/modules/CreateNFT/NFTPreview";
import { Box } from "@mui/material";

export default function CreateNFT() {
    return <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Box sx={{
            display: 'flex',
            maxWidth: '100%'
        }}>
            <Box>
                <CreateNFTForm />
            </Box>
            <Box>
                <NFTPreview />
            </Box>
        </Box>
    </Box>
}