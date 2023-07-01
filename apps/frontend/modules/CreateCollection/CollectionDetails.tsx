import SectionHeader from "@/components/CreateCollection/SectionHeader";
import { CreateCollectionContext} from "@/contexts/create_collection_context";
import { CreateCollectionAction, CreateCollectionActionKind } from "@/hooks/useCreateCollectionReducer";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, useContext, useEffect, useState } from "react";
import {AiFillCheckCircle} from "react-icons/ai"
import {VscError} from "react-icons/vsc"

interface CollectionDetailsProps {
    index: number,
    dispatch: Dispatch<CreateCollectionAction>
}

export default function CollectionDetails(props: CollectionDetailsProps) {


    const createCollectionContext = useContext(CreateCollectionContext)

    const getSegmentFromExternalURL = (isPlaceholder = false) => {
        if (!createCollectionContext.externalURL) {
            if (isPlaceholder) return "treasure-of-nun"
            return ""
        }
        const pathname = (new URL(createCollectionContext.externalURL)).pathname
        return pathname.replace('/collection/', '')
    }
    
    
    const [name, setName] = useState(createCollectionContext.name || "")
    const [description, setDescription] = useState(createCollectionContext.description || "")
    const [url, setURL] = useState(getSegmentFromExternalURL())
    const [urlPlaceholder, setURLPlaceholder] = useState(getSegmentFromExternalURL())
    const [isUrlSegmentValid, setIsUrlSegmentValid] = useState(false)


    useEffect(() => {
        if (createCollectionContext.externalURL) {
            const segment = getSegmentFromExternalURL()
            isExternalURLSegmentValid(segment).then((isValid) => setIsUrlSegmentValid(isValid))
        }
    } ,[createCollectionContext.externalURL])

    const handleOnNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setURLPlaceholder(e.target.value.toLowerCase().replaceAll(" ", "-"))
    }

    const isExternalURLSegmentValid = async (segment: string) => {
        const url = `${window.location.origin}/collection/${segment}`
        const res = await fetch(`/api/collection/isExternalURLAvailable?url=${encodeURI(url)}`)
        const data = await res.json()
        return data.data as boolean
    }

    const handleOnURLInput = (segment: string) => {
        setURL(segment)
        isExternalURLSegmentValid(segment).then((isValid) => {
            setIsUrlSegmentValid(isValid)
        })
    }
    
    const handleOnNextClick = async () => {
        if (name.length > 4 && description && description.length < 1000) {
            // TODO:Add the method to check collection name is unique
            // And the external url part will also be unique
            // Plus also check that the account shouldn't already hold any contract with same name
            let segment = url
            if(url.length === 0) {
                segment = name.toLowerCase().replaceAll(" ", "-")
            }
            const isValid = await isExternalURLSegmentValid(segment)
            if (!isValid){
                setIsUrlSegmentValid(false)
                props.dispatch({
                    type: CreateCollectionActionKind.SetSectionIndexHasError,
                    payload: [props.index, true]
                })
                return
            }
            props.dispatch({
                type: CreateCollectionActionKind.SetCollectionDetails,
                payload: {
                    name,
                    description,
                    externalURL: `${window.location.origin}/collection/${segment}`
                }
            })

            props.dispatch({
                type: CreateCollectionActionKind.SetSectionIndex,
                payload: props.index + 1
            })

            props.dispatch({
                type: CreateCollectionActionKind.SetSectionIndexHasError,
                payload: [props.index, false]
            })

        } else {
            props.dispatch({
                type: CreateCollectionActionKind.SetSectionIndexHasError,
                payload: [props.index, true]
            })
        }
    }

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
                                onChange={handleOnNameInput}
                                error={
                                    name.length < 4
                                }
                            />
                        </Box>

                        <Box sx={{marginTop: '2rem'}}>
                            <Typography variant="h6">Description</Typography>
                            <Typography color="primary.light" variant="body2">Markdown syntax is supported. {description.length} of 1000 characters used.</Typography>
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
                                error={
                                    description.length < 5 || description.length > 1000
                                }
                            />
                        </Box>
                        <Box sx={{marginTop: '2rem'}}>
                            <Typography variant="h6">URL</Typography>
                            <Typography color="primary.light" variant="body2">Customize your URL on Excluence. Must only contain lowercase letters, number and hyphens.</Typography>
                            <TextField 
                                variant="outlined" 
                                
                                required sx={{width: '60%', marginTop: '1rem'}} 
                                placeholder={urlPlaceholder}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">excluence.com/collection/</InputAdornment>,
                                    endAdornment: <InputAdornment position="end">
                                        {isUrlSegmentValid? <AiFillCheckCircle color="green" /> :
                                         <VscError color="red" />}
                                    </InputAdornment>
                                }}
                                value={url}
                                onChange={(e) => {
                                    handleOnURLInput(e.target.value)
                                }}
                            />
                        </Box>
            </Box>
        </Box>
}