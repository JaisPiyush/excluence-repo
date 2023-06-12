import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";

export interface NFTCardProps {
    address: string;
    tokenId?: string
}

export default function NFTCard(props: NFTCardProps) {
    const { contract } = useContract(props.address);
    const { data: nft, isLoading, error } = useNFT(contract, props.tokenId || "1");
    console.log(nft)
    if (isLoading) return <Card variant="outlined" sx={{
        paddingX: '1rem',
        borderRadius: '2rem',
        marginX: '2rem',
        marginBottom: '2rem'
    }}><CircularProgress/> </Card>;
    if (error || !nft) return <div>NFT not found</div>;
    return <Card variant="outlined" sx={{
        paddingX: '1rem',
        borderRadius: '2rem',
        marginX: '2rem',
        marginBottom: '2rem',
        paddingY: '1rem'
    }}>
        <ThirdwebNftMedia metadata={nft.metadata} />
        <CardContent>
            <Typography sx={{ fontWeight: 'medium', marginBottom: '1rem' }} >{nft?.metadata.name}</Typography>
            <Button fullWidth variant="contained" >Join Community</Button>
        </CardContent>
    </Card>
}