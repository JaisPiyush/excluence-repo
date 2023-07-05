import { ImageMediaRenderer } from "@/components/MediaRenderer"
import NFTViewDetail from "@/components/NFTViewDetail"
import NFTViewTitular from "@/components/NFTViewTitular"
import { NFTViewWithContractData } from "@/utility/types"
import { Box, Card, CardContent, Grid } from "@mui/material"

interface NFTViewContentProps {
    nft: NFTViewWithContractData
}

export default function NFTViewContent(props: NFTViewContentProps) {
    return <Box>
            <Grid container columns={10}>
                <Grid item xs={10} lg={5}>
                    <ImageMediaRenderer
                        src={props.nft.thumbnail.includes('http') ? props.nft.thumbnail : undefined}
                        cid={props.nft.thumbnail}
                        width={520}
                        height={520}
                        alt={props.nft.name}
                        style={{
                            borderRadius: '1rem'
                        }}
                    />  
                </Grid> 
                <Grid item xs={10} md={5}>
                    <NFTViewTitular 
                        nft={props.nft}
                    />
                </Grid>    
           </Grid>
           <Grid container columns={10}>
                <Grid item xs={10} lg={5}>
                    <NFTViewDetail nft={props.nft} />
                </Grid> 
                <Grid item xs={10} md={5}>
                </Grid>    
           </Grid>
    </Box>
            
}