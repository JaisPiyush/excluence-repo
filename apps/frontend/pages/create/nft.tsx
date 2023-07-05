import CreateNFTForm from "@/modules/CreateNFT/CreateNFTForm";
import NFTPreview from "@/modules/CreateNFT/NFTPreview";
import { Box, AlertColor } from "@mui/material";
import Loader from "@/components/Loader";
import { useState } from "react";
import SnackAlert from "@/components/SnackAlert";
import { BatchNFTArgs, MintNFTArgs } from "@/utility/types";
import { pinFileToIPFS } from "@/utility/pinata";
import { mintNFT } from "@/flow/tx_mint_nft";
import { useRouter } from "next/router";
import { Routes } from "@/utility/routes";
import { batchMintNFT } from "@/flow/tx_batch_mint_nft";

export default function CreateNFT() {

    const [loaderText, setLoaderText] = useState<string | null>(null)

    const [error, setError] = useState<string | null>(null);
    const [errorSev, setErrorSev] = useState<AlertColor>('error');
    const router  = useRouter();

    const handleOnCreateClick = async(args: BatchNFTArgs) => {
        setLoaderText('Uploading Thumbnail')
        const ipfsHash = await pinFileToIPFS(args.thumbnail, {
            name: `${args.name}-thumbnail`
        });
        if (ipfsHash === null) {
            setError('Failed to upload file')
        }

        const opts = {
            onStart: () => {
                setLoaderText('Minting NFT')
            },
            onSubmission: (txId: string) => {
                setLoaderText('Txn submitted')
                setError(`Txn ${txId} submitted.`)
                setErrorSev("info")
            },
            onSuccess: (_: any) => {
                setLoaderText(null)
                setError('NFT mint successful');
                router.replace(Routes.DashboardOwned)
            },
            onError: (error: Error) => {
                setLoaderText(null)
                setError(error.message)
                setErrorSev('error')
            },
            
        };

        if (args.quantity && parseInt(args.quantity) > 1) {
            await batchMintNFT(args, opts)
        }

        await mintNFT({
            name: args.name,
            description: args.description,
            thumbnail: ipfsHash as string,
            metadata: args.metadata,
            collectionName: args.collectionName
        }, opts )
    }

    return <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Box sx={{
            display: 'flex',
            maxWidth: '100%'
        }}>
            <Box>
                <CreateNFTForm onCreate={handleOnCreateClick} />
            </Box>
            <Box>
                <NFTPreview />
            </Box>
        </Box>
        <Loader 
            open={loaderText !== null} 
            onClose={() => {}}
            loadingTex={loaderText || undefined}
        />
        <SnackAlert
            error={error}
            severity={errorSev}
            onClose={() => {setError(null)}}
        />
    </Box>
}