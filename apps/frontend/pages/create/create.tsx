import CreateCollectionAppDrawer from "@/components/CreateCollection/CreateCollectionAppDrawer";
import Loader from "@/components/Loader";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { CreateCollectionActionKind, useCreateCollectionReducer } from "@/hooks/useCreateCollectionReducer";
import CollectionDetails from "@/modules/CreateCollection/CollectionDetails";
import CollectionEarnings from "@/modules/CreateCollection/CollectionEarnings";
import CollectionGraphics from "@/modules/CreateCollection/CollectionGraphics";
import CollectionSocials from "@/modules/CreateCollection/CollectionSocials";
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import {deployContract} from "@/flow/tx_deploy_contract"
import { pinFileToIPFS } from "@/utility/pinata";
import { useRouter } from "next/router";
import * as fcl from "@onflow/fcl"
import { Routes } from "@/utility/routes";



export default function CreateCollection() {


    const [createCollectionState, dispatch] = useCreateCollectionReducer()
    
    const handleOnSetIndex = (indx: number) => {
        dispatch({
            type: CreateCollectionActionKind.SetSectionIndex,
            payload: indx
        })
    }

    const [showLoader, setShowLoader] = useState(false)
    const [loaderText, setLoaderText] = useState("Deploying contract")
    const [snackBarText, setSnackBarText] = useState<string | null>(null)
    const [snackBarSev, setSnackBarSev] = useState<AlertColor>("error")

    const router = useRouter()

    const handleOnCreateCollectionClick = async () => { 
        if (createCollectionState.name && createCollectionState.name.length > 0 &&
            createCollectionState.description && createCollectionState.externalURL &&
            createCollectionState.squareImage && createCollectionState.bannerImage
            ) {
                if ((await fcl.currentUser.snapshot()).addr === undefined) {
                    await fcl.reauthenticate()
                }
                setShowLoader(true)
                setLoaderText("Uploading square image")
                const squareImageCid = await pinFileToIPFS(createCollectionState.squareImage, {
                    name: `${createCollectionState.name}-Square Image`,
                    type: 'image/*'
                })
                setLoaderText("Uploading banner image")
                const bannerImageCid = await pinFileToIPFS(createCollectionState.bannerImage, {
                    name: `${createCollectionState.name}-Banner Image`,
                    type: 'image/*'
                })
                setLoaderText("Deploying contract")
                const createCollectionData = {...createCollectionState}
                createCollectionData.squareImage = squareImageCid
                createCollectionData.bannerImage = bannerImageCid

                await deployContract(createCollectionData, {
                    onSubmission:  (txID: string) => {
                        setLoaderText(`Txn submitted`)
                        setSnackBarSev("info")
                        setSnackBarText(`Txn ${txID} submitted.`)
                    },
                    onSuccess:  async () => {  
                        console.log("Completed")                   
                        setLoaderText("Registering the collection")
                        setShowLoader(false)
                        setSnackBarText("Collection Deployed")
                        setSnackBarSev("success")
                        router.replace(Routes.DashboardCollections)
                    },
                    onError:  (err: Error) => {
                        setShowLoader(false)
                        setSnackBarText("Failed to create collection")
                        setSnackBarSev("error")
                    }
                })
            }
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
                return <CollectionEarnings 
                            index={2}
                            dispatch={dispatch}
                    />
            case 3:
                return <CollectionSocials 
                            index={3}
                            dispatch={dispatch}
                            onCreate={() =>{handleOnCreateCollectionClick()}}
                    />
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
                    <Loader 
                        open={showLoader} 
                        onClose={() => {}}
                        loadingTex={loaderText}
                    />
                    <Snackbar 
                        open={snackBarText !== null} 
                        autoHideDuration={6000}
                        onClose={() => {setSnackBarText(null)}}
                    >
                        <Alert 
                            onClose={() => {setSnackBarText(null)}}
                            severity={snackBarSev}>
                                {snackBarText}
                        </Alert>
                    </Snackbar>
                </Box>
                
        </CreateCollectionContext.Provider>
        
    </Box>
}