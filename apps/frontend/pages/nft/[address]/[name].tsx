import NFTViewContent from "@/modules/NFTViewContent";
import { useGetNFTView } from "@/hooks/useGetNFTView";
import { Box } from "@mui/material";
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react";
import { CollectionOnServer, NFTViewWithContractData } from "@/utility/types";
// import { fetchAllNFTs } from "@/flow/nft";

export default function NFTPageView() {
    const router = useRouter();

    const collection: CollectionOnServer = {
        address: router.query.address as string,
        contractName: router.query.name as string,
        externalURL: ''
    }



    const nfts = useGetNFTView(collection, [router.query.id as string]);


    if (nfts.length === 0) {
        //TODO: add no nft found page
        return <></>
    }

    return <Box sx={{width: '100%', paddingY: '5%', display: 'flex', justifyContent: 'center'}}>
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            md: '80%',
                        }
                    }}
                >
                    <NFTViewContent nft={nfts[0]} />
                </Box>
            </Box>
}