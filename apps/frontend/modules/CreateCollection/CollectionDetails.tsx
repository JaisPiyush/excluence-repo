import SectionHeader from "@/components/CreateCollection/SectionHeader";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

interface CollectionDetailsProps {}

export default function CollectionDetails(props: CollectionDetailsProps) {

    
    const createCollectionContext = useContext(CreateCollectionContext)
    const [name, setName] = useState(createCollectionContext.name || "")
    const [description, setDescription] = useState(createCollectionContext.description || "")
    const [url, setURL] = useState(createCollectionContext.externalURL || "")

    const handleOnNextClick = () => {}

    return <Box>

                <SectionHeader 
                    heading="Collection details" 
                    onNexClick={handleOnNextClick}
                />
                <Box
                    sx= {{
                        marginTop: '3rem'
                    }}>
                        <Box>
                            <Typography sx={{
                                marginBottom: '1rem'
                            }}  variant="h6">Name*</Typography>
                            <TextField 
                                variant="outlined"  
                                required sx={{width: '60%'}} 
                                placeholder="Name your collection"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </Box>

                        <Box sx={{marginTop: '2rem'}}>
                            <Typography variant="h6">Description</Typography>
                            <Typography color="primary.light" variant="body2">Markdown syntax is supported. 0 of 1000 characters used.</Typography>
                            <TextField 
                                multiline
                                rows={4} 
                                variant="outlined"  
                                required 
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                sx={{
                                    width: '60%',
                                    marginTop: '1rem'
                                }} 
                                placeholder="Add a description"
                            />
                        </Box>
                        <Box sx={{marginTop: '2rem'}}>
                            <Typography variant="h6">URL</Typography>
                            <Typography color="primary.light" variant="body2">Customize your URL on Excluence. Must only contain lowercase letters, number and hyphens.</Typography>
                            <TextField 
                                variant="outlined" 
                                
                                required sx={{width: '60%', marginTop: '1rem'}} 
                                placeholder="treasure-of-the-nun"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">excluence.com/collection/</InputAdornment>
                                }}
                                value={url}
                                onChange={(e) => {
                                    setURL(e.target.value)
                                }}
                            />
                        </Box>
            </Box>
        </Box>
}