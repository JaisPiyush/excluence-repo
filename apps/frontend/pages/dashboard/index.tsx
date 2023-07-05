import { Box, Tab, Tabs } from "@mui/material";
import DashboardHeader from "@/modules/Dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Switch, SwitchCase } from "@/components/Switch";
import DashboardCollections from "@/modules/Dashboard/DashboardCollections";
import { useGetAllCollectionByAddress } from "@/hooks/useGetAllCollectionByAddress";
import { useGetAllCollectionIds } from "@/hooks/useGetAllCollectionIds";
import { getAllOwnedNFTIs } from "@/flow/nft";
import { NFTViewWithContractData } from "@/utility/types";
import NFTCardHolder from "@/components/NFTCardHolder";

export default function Dashboard() {

    const tabs = ['Owned', 'Collections']

    const [tab, setTab] = useState<string>(tabs[0].toLowerCase())
 
    const router  = useRouter()

    const [nfts, setNFTs] = useState<NFTViewWithContractData[]>([])

    useEffect(() => {
        if (router.query && router.query['tab']) {
            setTab(router.query['tab'] as string)
        }

        getAllOwnedNFTIs().then((nfts) => {
            setNFTs([...nfts])
        })
    }, [router])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    return <Box
                sx={{
                    width: '100%',
                    paddingX: '32px'
                }}
            >
                <DashboardHeader />
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tab} onChange={handleChange} >
                        {tabs.map((tab, index) => <Tab key={index} value={tab.toLowerCase()} label={tab} sx={{textTransform: 'unset !important'}} />)}
                    </Tabs>
                </Box>
                <Box sx={{
                    width: '100%',
                    paddingTop: '2rem',
                    paddingBottom: '10rem'
                }}>
                    <Switch value={tab}>
                        <SwitchCase case="owned">
                            <NFTCardHolder nfts={nfts} />
                        </SwitchCase>
                         
                        <SwitchCase case="collections">
                            <DashboardCollections />
                        </SwitchCase>
                    </Switch>
                </Box>
            </Box>
}