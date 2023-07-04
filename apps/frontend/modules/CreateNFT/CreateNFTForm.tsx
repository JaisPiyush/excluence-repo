import MediaSelector from "@/components/CreateCollection/MediaSelector";
import { DescriptiveTextInput } from "@/components/DescriptiveTextInput";
import { Trait } from "@/utility/types";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddTrait from "./AddTrait";
import ExButton from "@/components/ExButton";
import { useGetAllCollectionByAddress } from "@/hooks/useGetAllCollectionByAddress";
import SelectCollection from "@/components/SelectCollection";

interface CreateNFTFormProps {}

export default function CreateNFTForm(props: CreateNFTFormProps) {

    const [image, setImage] = useState<string | undefined>(undefined)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [supply, setSupply] = useState('1')
    const [selectedCollection, setSelectedCollection] = useState<number | undefined>(undefined);

    const collections = useGetAllCollectionByAddress();


    const [traits, setTraits] = useState<Trait[]>([]);

    const handleOnInsertTraits = (newTraits: Trait[]) => {
        console.log(traits.concat(newTraits))
        setTraits([...traits.concat(newTraits)])
    }

    const handleOnRemoveTrait = (index: number) => {
        setTraits(traits.filter((_, i) => i !== index))
    }

    return <Box sx={{
        paddingBottom: '50%',
        paddingTop: '8%'
    }}>
                <Typography variant="h3" fontWeight={600} >Create New NFT</Typography>
                <MediaSelector 
                    setUploadedImage={(img) => {setImage(img)}}
                    heading="Upload file"
                    subheader="PNG, GIF, WEBP, MP$ or MP#. Max 100mb."
                    uploadedImage={image}
                />
                
                <DescriptiveTextInput 
                    header="Name*"
                    placeholder={'e.g "Redeemable T-Shirt with logo'}
                    value={name}
                    setValue={setName}
                />

                <DescriptiveTextInput
                    header="Description"
                    subheader="Markdown syntax is supported. 0 of 1000 characters used."
                    placeholder={'e.g "After purchasing you\'ll be able to get the real T-shirt"'}
                    multiline
                    rows={4}
                    value={description}
                    setValue={setDescription}
                />

                <SelectCollection 
                    collections={collections}
                    value={selectedCollection}
                    setValue={setSelectedCollection}
                />

                <DescriptiveTextInput
                    header="Supply"
                    subheader="The number of items to mint"
                    placeholder="10"
                    value={supply}
                    setValue={setSupply}
                />

                <AddTrait 
                    traits={traits}
                    onInsertTraits={handleOnInsertTraits}
                    onRemove={handleOnRemoveTrait}
                    sx={{
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}
                />

                <ExButton isPrimary>Create</ExButton>
                
            </Box>
}
