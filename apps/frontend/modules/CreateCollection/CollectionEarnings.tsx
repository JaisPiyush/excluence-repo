import RoyaltyShareInput from "@/components/CreateCollection/RoyaltyShareInput";
import SectionHeader from "@/components/CreateCollection/SectionHeader";
import ExButton from "@/components/ExButton";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { CreateCollectionAction, CreateCollectionActionKind } from "@/hooks/useCreateCollectionReducer";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { Dispatch, useContext, useState } from "react";

interface CollectionEarningsProps {
    index: number;
    dispatch: Dispatch<CreateCollectionAction>
}

export default function CollectionEarnings(props: CollectionEarningsProps) {
    const handleOnNextClick = () => {
        if (royalties.length > 0) {
            props.dispatch({
                type: CreateCollectionActionKind.SetCollectionRoyalties,
                payload: {
                    royalties
                }
            })

            props.dispatch({
                type: CreateCollectionActionKind.SetSectionIndex,
                payload: props.index + 1
            })
        }
    }

    const [hasCutPercOverflown, setHasCutPercOverflown] = useState(false)
    const createCollectionContext = useContext(CreateCollectionContext)
    const [royalties, setRoyalties] = useState<Array<[string, string, string?]>>(createCollectionContext.royalties || [])
    
    const addRoyaltyShareInput = () => {
        royalties.push(["", "0",])
        setRoyalties([...royalties])
    }

    const isValidCutData = (cut: string) => {
        try {
            parseFloat(cut)
            
        }catch(e){
            return false
        }
        return true
    }

    const setInputAddress = (index: number, address: string) => {
        royalties[index][0] = address
        setRoyalties([...royalties])
    }

    const setInputCut = (index: number, cut: string) => {
        royalties[index][1] = cut
        setHasCutPercOverflown(
            isValidCutData(cut) &&
            royalties.reduce<number>(
                (prevValue, value) => prevValue + parseFloat(value[1]),
                0
            ) > 100
        )
        setRoyalties([...royalties])
    }

    const removeRoyaltyShareInput = (index: number) => {
        setRoyalties(royalties.filter((_, ind) => index !== ind))
    }
    
    return <Box>
            <SectionHeader
                heading="Creator earnings & royalties"
                onNexClick={handleOnNextClick}
            />

            <Box sx={{width: '60%', marginTop: '2rem'}}>
                <Typography color="primary.light" variant="body1">
                Collection owners can collect creator earnings when a user re-sells an item they created.
                Contact the collection owner to change the collection earnings percentage or the payout address.
                </Typography>
            </Box>

            <Box
             sx={{
                marginY: '2rem'
             }}
            >
                {royalties.map((royalty, index) => {
                    return <RoyaltyShareInput 
                        key={index}
                        address={royalty[0]}
                        cut={royalty[1]}
                        setAddress={(addr) => {setInputAddress(index, addr)}}
                        setCut={(cut) => {setInputCut(index, cut)}}
                        removeClick={() => {removeRoyaltyShareInput(index)}}


                    />
                })}
            </Box>

            <Snackbar 
                open={hasCutPercOverflown} 
                autoHideDuration={6000}
                onClose={() => {setHasCutPercOverflown(false)}}
            >
                <Alert 
                    onClose={() => {setHasCutPercOverflown(false)}}
                    severity="error">
                        Total cut percentage is more than 100%
                </Alert>
            </Snackbar>

            <ExButton isPrimary={false}
                onClick={() => {addRoyaltyShareInput()}}
            >
                Add address
            </ExButton>
    </Box>
}