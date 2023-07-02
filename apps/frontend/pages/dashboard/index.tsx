import { Box, Tab, Tabs } from "@mui/material";
import DashboardHeader from "@/modules/Dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Switch, SwitchCase } from "@/components/Switch";
import DashboardCollections from "@/modules/Dashboard/DashboardCollections";
import { useGetAllCollectionByAddress } from "@/hooks/useGetAllCollectionByAddress";

export default function Dashboard() {

    const tabs = ['Owned', 'Collections', 'Created']

    const [tab, setTab] = useState<string>(tabs[0].toLowerCase())

    
    
    const router  = useRouter()

    useEffect(() => {
        if (router.query && router.query['tab']) {
            setTab(router.query['tab'] as string)
        }
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
                            <Box sx={{bgcolor: 'red', width: 500, height: 500}}></Box>
                        </SwitchCase>

                        <SwitchCase case="created">
                            <Box sx={{bgcolor: 'green', width: 500, height: 500}}></Box>
                        </SwitchCase>
                         
                        <SwitchCase case="collections">
                            <DashboardCollections />
                        </SwitchCase>
                    </Switch>
                </Box>
            </Box>
}