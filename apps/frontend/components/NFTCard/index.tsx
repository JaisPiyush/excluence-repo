import { Card, CardMedia, useTheme } from "@mui/material";
import ImageMediaRenderer, { ImageMediaSources } from "../MediaRenderer/ImageMediaRenderer";
import { NFTHttpFile, NFTIpfsFile, NFTMetadataViewsDisplay, NFTMetadataViewsEditions } from "./types";

type NFTCardProps = ImageMediaSources & {
    id: number
    display: NFTMetadataViewsDisplay,
    editions: NFTMetadataViewsEditions
}

export default function NFTCard(props: NFTCardProps) {
    const theme = useTheme()

    return <Card
            variant="outlined" 
            sx={{
                width: {
                    lg: 267.19,

                },
                height: 'auto',
                border: `1px solid ${theme.palette.primary.light}`,
                padding: '0.5rem',
                borderRadius: '1rem'
            }}
    >   
        <ImageMediaRenderer
            alt={props.display.name}
            width={233.66}
            height={235.66}
            desktopWidth={265.19}
            desktopHeight={267.19}
            style={{
                borderRadius: '0.5rem'
            }}
            src={(props.display.thumbnail as NFTHttpFile).url}
            cid={(props.display.thumbnail as NFTIpfsFile).cid}
            path={(props.display.thumbnail as NFTIpfsFile).path}
        />
    </Card>
}