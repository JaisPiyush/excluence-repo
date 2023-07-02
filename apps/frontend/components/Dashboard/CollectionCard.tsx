import { useGetNFTCollectionView } from "@/hooks/useGetNFTCollectionView";
import { CollectionOnServer } from "@/utility/types";
import { Avatar, Box, Typography } from "@mui/material";
import { ImageMediaRenderer } from "../MediaRenderer";
import { flowIcon } from "@/utility";
import { useRouter } from "next/router";
import { DynamicRoutes, getDynamicRoute } from "@/utility/routes";

interface CollectionCardProps {
   collection: CollectionOnServer
}

export default function CollectionCard(props: CollectionCardProps) {
    const router = useRouter()
    const collection = useGetNFTCollectionView(
        props.collection.contractName, 
        props.collection.address
    )

    const handleCardClick = () => {
        router.push(getDynamicRoute(DynamicRoutes.ViewCollection, {
                address: props.collection.address, 
                name: props.collection.contractName
        }))
    }
    if (collection !== null) {

    
        return <Box sx={{
            width: 300,
            height: 300,
            border: '3px solid',
            borderColor: 'secondary.light',
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginX: '0.5rem',
            absolute: 'relative',
            '&:hover': {                   
                border: '4px solid',
                borderColor: 'primary.main',
            },
            cursor: 'pointer',
        }}
        onClick={() => {handleCardClick()}}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                zIndex: '1'
            }}>
                <ImageMediaRenderer
                    cid={collection.collectionSquareImage}
                    alt={collection.collectionName}
                    width={295}
                    height={245}
                    style={{
                        borderRadius: '1.5rem',
                    }}
                    tabletHeight={'100%'}
                    tabletWidth={'100%'}
                    desktopHeight={'100%'}
                    desktopWidth={'100%'}
                />
            </Box> 
            <Box sx={{
                width: 280,
                height: '80px',
                bgcolor: 'secondary.main',
                backdropFilter: 'blur(20px)',
                opacity: '0.95',
                position: 'absolute',
                zIndex: 10,
                borderRadius: '1rem',
                bottom: -190,
                display: 'flex',
                alignItems: 'center',
                paddingX: '1rem',
                border: '2px solid',
                borderColor: 'primary.main'
            }}>
                <Avatar src={flowIcon} />
                <Typography sx={{marginLeft: '0.5rem', textOverflow: 'ellipsis'}}
                    fontWeight={'600'}
                >{collection.collectionName}</Typography>
            </Box>
        </Box>
    }
    return <></>
}