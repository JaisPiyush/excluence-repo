import { createNFTCollection } from "@/api/nftCollection";
import { getAllCollectionByAddress } from "@/api/nftCollection";
import ContractCard from "@/components/ContractCard";
import Loader from "@/components/Loader";
import { fetchAllContractsInAccount } from "@/flow/get_all_contract_in_account.script";
import { getCollectionData } from "@/flow/get_collection_data.script";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl"
import SnackAlert from "@/components/SnackAlert";

export default function ImportCollection() {

    const [contracts, setContracts ] = useState<string[]>([])
    const [loaderText, setLoaderText] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)


    const fetchAllContractsInAccountAndFilterImportedCollections = async () => {
        const {names} = await fetchAllContractsInAccount() as {names: string[]}
        const addr = (await fcl.currentUser.snapshot()).addr
        const collectionsInDB = (await getAllCollectionByAddress(addr)).map((coll) => coll.contractName)

        const contracts = names.filter((name) => !collectionsInDB.includes(name))
        setContracts([...contracts])
    }

    useEffect(() => {
        fetchAllContractsInAccountAndFilterImportedCollections().then()
    }, [contracts])

    const handleImportCollection = async (name: string) => {
        try {
            setLoaderText('Importing collection')
            const nftCollectionData = await getCollectionData(name)
            setLoaderText('Registering collection')
            const [_, err] = await createNFTCollection({
                contractName: name,
                externalURL: nftCollectionData.collectionExternalURL
            })
            if (err !== null) {
                throw new Error(err)
            }
            await fetchAllContractsInAccountAndFilterImportedCollections();
            setLoaderText(null)
        }catch (error) {
            setLoaderText(null)
            setError(`Failed to import collection: ${(error as Error).message} `)
        }
        
    }

    return <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4rem'
    }}>
        <Typography variant="h4" fontWeight={'medium'}>Import your collection</Typography>
        <Box sx={{
            width: '70%',
            display: 'flex',
            flexWrap: 'wrap',
            paddingTop: '4rem'
        }}>
            {
                contracts.map((name, index) => <ContractCard onClick={() => {handleImportCollection(name)}} name={name} key={index} />)
            }
        </Box>
        <Loader open={loaderText !== null} loadingTex={loaderText as string} onClose={() => {
            setLoaderText(null)
        }} />
        <SnackAlert error={error} onClose={() => {setError(null)}} />
    </Box>
}