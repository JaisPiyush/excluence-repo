import MediaSelector from "@/components/CreateCollection/MediaSelector";
import { DescriptiveTextInput } from "@/components/DescriptiveTextInput";
import { Box, TextField, Typography } from "@mui/material";

interface CreateNFTFormProps {}

export default function CreateNFTForm(props: CreateNFTFormProps) {
    return <Box>
                <Typography variant="h3" fontWeight={600} >Create New NFT</Typography>
                <MediaSelector 
                setUploadedImage={(img) => {}}
                heading="Upload file"
                subheader="PNG, GIF, WEBP, MP$ or MP#. Max 100mb."
                />
                
                <DescriptiveTextInput 
                    header="Name*"
                    placeholder={'e.g "Redeemable T-Shirt with logo'}
                />

                <DescriptiveTextInput
                    header="Description"
                    subheader="Markdown syntax is supported. 0 of 1000 characters used."
                    placeholder={'e.g "After purchasing you\'ll be able to get the real T-shirt"'}
                    multiline
                    rows={4}
                />
                
            </Box>
}
