import { Avatar, Box, Chip, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { ImageMediaRenderer } from "../MediaRenderer";
import { useRouter } from "next/router";
import { DynamicRoutes, getDynamicRoute } from "@/utility/routes";
import { NFTMetadataViewsEdition, NFTMetadataViewsEditions, NFTViewWithContractData } from "@/utility/types";

interface NFTViewTitularProps {
    nft: NFTViewWithContractData
}

//TODO: Fix the collection image
export default function NFTViewTitular(props: NFTViewTitularProps) {

    const router = useRouter()

    const handleRedirectToCollectionPage = () => {
        router.push(getDynamicRoute(
            DynamicRoutes.ViewCollection,
            {
                address: props.nft.address,
                name: props.nft.contractName
            }
        ))
    }

    const edition: NFTMetadataViewsEdition = props.nft.editions && props.nft.editions.infoList.length > 0 ? props.nft.editions.infoList[0]: {
        name: props.nft.name,
        number: 1,
        max: 1
    }

    let name = props.nft.name;
    if (edition.max && edition.max > 1) {
        name += ` #${edition.number}`
    }

    const serial = `${edition.number}/${edition.max || 1}`

    return <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <ListItem disablePadding sx={{marginBottom: '1rem'}}>
                    <ListItemAvatar onClick={() => {handleRedirectToCollectionPage()}}>
                        <Avatar>
                            <ImageMediaRenderer
                                src={props.nft.collectionSquareImage.includes('http') ? props.nft.collectionSquareImage : undefined}
                                cid={props.nft.collectionSquareImage}
                                width={80}
                                height={80}
                                alt={props.nft.collectionName}
                                
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.nft.collectionName} 
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }} 
                        onClick={() => {handleRedirectToCollectionPage()}}
                    />
                </ListItem>
                <Typography variant="h4" fontWeight={600}>{name}</Typography>
                <Box sx={{marginY: '1rem'}}>
                    <Chip label={serial} sx={{
                        padding: '1rem',
                        borderRadius: '0.2rem'
                    }} />
                </Box>
                <Box sx={{
                    display: 'flex'
                }}>
                    <Typography color="primary.light" >Owned by</Typography>
                    <Typography sx={{marginX:'0.25rem'}}>{props.nft.owner}</Typography>
                </Box>
           </Box>
}