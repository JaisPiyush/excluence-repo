import { Grid } from "@mui/material"
import NFTCard, { NFTCardProps } from "../NFTCard"

interface NFTCardHolderProps {
    nfts: NFTCardProps[]
}

export default function NFTCardHolder(props: NFTCardHolderProps) {
    return <Grid container columns={16} spacing={2}>
        {props.nfts.map((nft, index) => {
            return <Grid key={index} item xs={2} md={3} lg={4}>
                <NFTCard {...nft} />
            </Grid>
        })}
    </Grid>
}