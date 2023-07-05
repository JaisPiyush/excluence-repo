import MediaSelector from "@/components/CreateCollection/MediaSelector";
import { DescriptiveTextInput } from "@/components/DescriptiveTextInput";
import { BatchNFTArgs, MintNFTArgs, Trait } from "@/utility/types";
import { AlertColor, Box, Typography } from "@mui/material";
import { useState } from "react";
import AddTrait from "./AddTrait";
import ExButton from "@/components/ExButton";
import { useGetAllCollectionByAddress } from "@/hooks/useGetAllCollectionByAddress";
import SelectCollection from "@/components/SelectCollection";

import { mintNFT } from "@/flow/tx_mint_nft";

interface CreateNFTFormProps {
    onCreate: (args: BatchNFTArgs) => void;
}

export default function CreateNFTForm(props: CreateNFTFormProps) {

    const [image, setImage] = useState<string | undefined>(undefined)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [supply, setSupply] = useState('1')
    const [selectedCollection, setSelectedCollection] = useState<number | undefined>(undefined);

    const collections = useGetAllCollectionByAddress();

    const [traits, setTraits] = useState<Trait[]>([]);

    const handleOnInsertTraits = (newTraits: Trait[]) => {
        setTraits([...traits.concat(newTraits)])
    }

    const handleOnRemoveTrait = (index: number) => {
        setTraits(traits.filter((_, i) => i !== index))
    }

    const handleOnCreateClick =() => {
        if (name.length > 0 && selectedCollection && image && image.length > 0) {
            const metadata: Record<string, string> = {}
            traits.forEach((trait) => {
                metadata[trait.name] = typeof trait.value === 'string' ? trait.value : trait.value.toString()
            })
            props.onCreate({
                name,
                description,
                thumbnail: image,
                collectionName: collections[selectedCollection].contractName,
                metadata,
                quantity: supply
            });
        }
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
                    required

                />

                <DescriptiveTextInput
                    header="Description"
                    subheader={`Markdown syntax is supported. ${description.length}  of 500 characters used.`}
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

                <ExButton isPrimary onClick={handleOnCreateClick}>Create</ExButton>
                
                
            </Box>
}
