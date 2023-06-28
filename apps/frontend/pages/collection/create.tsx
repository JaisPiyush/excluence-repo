import CreateCollectionAppDrawer from "@/components/CreateCollection/CreateCollectionAppDrawer";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { CreateCollectionActionKind, useCreateCollectionReducer } from "@/hooks/useCreateCollectionReducer";
import CollectionDetails from "@/modules/CreateCollection/CollectionDetails";
import CollectionEarnings from "@/modules/CreateCollection/CollectionEarnings";
import CollectionGraphics from "@/modules/CreateCollection/CollectionGraphics";
import CollectionSocials from "@/modules/CreateCollection/CollectionSocials";
import { Box } from "@mui/material";




export default function CreateCollection() {


    const [createCollectionState, dispatch] = useCreateCollectionReducer()
    
    const handleOnSetIndex = (indx: number) => {
        dispatch({
            type: CreateCollectionActionKind.SetSectionIndex,
            payload: indx
        })
    }

    const displayCurrentSection = () => {
        switch(createCollectionState.sectionIndex) {
            case 0:
                return <CollectionDetails
                    index={0}
                    dispatch={dispatch}
                />
            case 1:
                return <CollectionGraphics 
                        index={1}
                        dispatch={dispatch}
                />
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
                    currentIndex={createCollectionState.sectionIndex} 
                    onIndexChange={handleOnSetIndex}
                    hasError={createCollectionState.sectionIndexHasError}
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