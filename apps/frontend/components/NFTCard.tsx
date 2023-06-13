/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addUserToToleOfCollection, dashboardActions } from "../redux/dashboard";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { backendApi } from "../axiosInstance";
import { getAuthorizationHeader } from "../redux/utils";

export interface NFTCardProps {
    address: string;
    tokenId?: string;
    onClick?: () => void;
    isCollected?: boolean;
}

export default function NFTCard(props: NFTCardProps) {
    const { contract } = useContract(props.address);
    const { data: nft, isLoading, error } = useNFT(contract, props.tokenId || "1");
    const {data: session} = useSession()
    const [currentCollectedContract] = useAppSelector((state) => [state.dashboard.currentCollectedContract]);
    const [showJoinCommunityBtn, setShowJoinCommunityBtn] = useState(true);
    const [fetchedNonJoinedRoles, setFetchedNonJoinedRoles] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session && (session as any).accessToken && !fetchedNonJoinedRoles && props.isCollected) {
            fetchAllNonJoinedRolesInContract().then(() => {})
        }
    }, []);

    if (isLoading) return <Card variant="outlined" sx={{
        paddingX: '1rem',
        borderRadius: '2rem',
        marginX: '2rem',
        marginBottom: '2rem'
    }}><CircularProgress/> </Card>;
    if (error || !nft) return <div>NFT not found</div>;

    const fetchAllNonJoinedRolesInContract = async () => {
        try {
            const res = await backendApi.get<{result: Record<string, string>[]}>(`synthetic-role/guild/collection/${props.address}/status`, {
                headers: getAuthorizationHeader()
            });
            setFetchedNonJoinedRoles(true);
            setShowJoinCommunityBtn(res.data.result.length > 0);
        } catch(e) {

        }
    }

    

    const handleJoinCommunityClick = () => {
        dispatch(dashboardActions.setCurrentCollectedContract(props.address));
        if (!(session && (session as any).accessToken)) {
            signIn('discord');
        }else {
            dispatch(addUserToToleOfCollection({
                address: props.address,
                accessToken: (session as any).accessToken
            }))
        }
    }

    return <Card variant="outlined" sx={{
        paddingX: '1rem',
        borderRadius: '2rem',
        marginX: '2rem',
        marginBottom: '2rem',
        paddingY: '1rem'
    }}
    onClick={() => { 
        if(props.onClick !== undefined) {
            props.onClick();
        }
    }}
    >
        <ThirdwebNftMedia metadata={nft.metadata} />
        <CardContent>
            <Typography sx={{ fontWeight: 'medium', marginBottom: '1rem' }} >{nft?.metadata.name}</Typography>
            {
                (props.isCollected === true && showJoinCommunityBtn) ? <Button onClick={() => {
                    handleJoinCommunityClick()
                }} fullWidth variant="contained" >{
                    session && (session as any).accessToken ? 'Join Community': 'Connect Discord'
                }</Button> : <></>
            }
        </CardContent>
    </Card>
}