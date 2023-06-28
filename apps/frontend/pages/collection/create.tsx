import CreateCollectionAppDrawer from "@/components/CreateCollection/CreateCollectionAppDrawer";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { useCreateCollectionReducer } from "@/hooks/useCreateCollectionReducer";
import CollectionDetails from "@/modules/CreateCollection/CollectionDetails";
import CollectionEarnings from "@/modules/CreateCollection/CollectionEarnings";
import CollectionGraphics from "@/modules/CreateCollection/CollectionGraphics";
import CollectionSocials from "@/modules/CreateCollection/CollectionSocials";
import { ICreateCollectionContext } from "@/utility/types";
import { Box } from "@mui/material";
import { useReducer, useState } from "react";




export default function CreateCollection() {

    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [indexHasError, setIndexHasError] = useState<Record<number, boolean>>({})

    const [createCollectionState, dispatch] = useCreateCollectionReducer()
    
    const handleOnSetHasErrorIndex = (indx: number, hasError: boolean) => {
        indexHasError[indx] = hasError
        setIndexHasError({...indexHasError})
    }

    const displayCurrentSection = () => {
        switch(currentSectionIndex) {
            case 0:
                return <CollectionDetails />
            case 1:
                return <CollectionGraphics />
            case 2:
                return <CollectionEarnings />
            case 3:
                return <CollectionSocials />
        }
    }

    return <Box sx={{
        width: '100%'
    }}>
        <CreateCollectionContext.Provider value={createCollectionState}>
            <CreateCollectionAppDrawer 
                currentIndex={currentSectionIndex} 
                onIndexChange={setCurrentSectionIndex}
                hasError={indexHasError}
                setIndexHasError={handleOnSetHasErrorIndex}
            />
            <Box sx={{
                marginLeft: 50,
                marginTop: 5,
            }}>
                {displayCurrentSection()}
            </Box>
        </CreateCollectionContext.Provider>
        
    </Box>
}