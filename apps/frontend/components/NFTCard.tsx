import { Button, Card, CardContent, Typography } from "@mui/material";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";

export interface NFTCardProps {
    address: string;
}

export default function NFTCard() {
    const { contract } = useContract("0xbe072760153ec7432c36713daba89a4c45de63a0");
    const { data: nft, isLoading, error } = useNFT(contract, "1");
    if (isLoading) return <div>Loading...</div>;
    if (error || !nft) return <div>NFT not found</div>;
    return <Card variant="outlined" sx={{
        paddingX: '1rem',
        borderRadius: '2rem',
        marginX: '2rem',
        marginBottom: '2rem'
    }}>
        <ThirdwebNftMedia metadata={nft.metadata} />
        <CardContent>
            <Typography sx={{ fontWeight: 'medium', marginBottom: '1rem' }} >{nft?.metadata.name}</Typography>
            <Button fullWidth variant="contained" >Join Community</Button>
        </CardContent>
    </Card>
}