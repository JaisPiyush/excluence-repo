import { Avatar, Box, Card, CardHeader, Tab, Tabs, Typography } from "@mui/material";
import { Header } from "../../components/header/Header";
import { useRouter } from "next/router";
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { SyntheticRole } from "../../types";
import { getAuthorizationHeader } from "../../redux/utils";
import { backendApi } from "../../axiosInstance";
import { discordIcon } from "../../constant";
import MultipleSelectCard from "../../components/shared/MultipleSelectCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { findMySyntheticRoles } from "../../redux/dashboard";

interface CollectionGuildData {
    guildId: string;
    name: string;
    icon: string | null
}

export default function CollectionPage() {
    const router = useRouter();
    const address = router.query.address as string;
    const { contract } = useContract(address);
    const [supply, setSupply] = useState(0);
    const [fetchedDetails, setFetchedDetails] = useState(false)
    const getDetails = async () => {
        if (!contract || fetchedDetails) return;
        setSupply((await contract.erc721.totalCirculatingSupply()).toNumber())
        setFetchedDetails(true)
    }
    const { data: nft, isLoading, error } = useNFT(contract, "1");

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    

    const [collectionRoles, setCollectionRoles] = useState<SyntheticRole[]>([]);
    const [fetchedRoles, setFetchedRoles] = useState(false);
    const [collectionGuilds, setCollectionGuilds] = useState<CollectionGuildData[]>([]);
    const [fetchedGuilds, setFetchedGuilds] = useState(false);

    const [selectedRoles, setSelectedRoles] = useState<Record<string, boolean>>({})
    const [showUpdateRoleButton, setShowUpdateRoleButton] = useState(false);

    const findAllRolesByAddress = async () => {
        const res = await backendApi.get<{result: SyntheticRole[]}>(`synthetic-role/collection/${address}`, {
            headers: getAuthorizationHeader()
        });
        const roles =  res.data.result;
        setFetchedRoles(true)
        setCollectionRoles(roles);
    }

    const findAllGuildsByAddress = async () => {
        const res = await backendApi.get<{result: CollectionGuildData[]}>(`synthetic-role/guild/collection/${address}`, {
            headers: getAuthorizationHeader()
        });
        const guildData = res.data.result;
        setFetchedGuilds(true);
        setCollectionGuilds(guildData);
    }

    const [syntheticRoles, fetchedSyntheticRoles] = useAppSelector((state) => [
        state.dashboard.syntheticRoles,
        state.dashboard.fetchedSyntheticRoles
    ]);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (typeof window !== 'undefined' && !fetchedRoles) {
            findAllRolesByAddress().then(() => {})
        }
        if (typeof window !== 'undefined' && !fetchedGuilds) {
            findAllGuildsByAddress().then(() => {})
        }
        if (!fetchedSyntheticRoles) {
            dispatch(findMySyntheticRoles())
        }
        if (contract) {
            getDetails().then(() => {})
        }
    })




    const getNFTHeader = () => {
        if (!nft) return <></>
        return <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <ThirdwebNftMedia metadata={nft.metadata} />
            <Typography variant="h5" sx={{
                marginTop: '2rem',
                fontWeight: 'bold'
            }}>{nft.metadata.name}</Typography>
            <Typography>
                Items: {supply}
            </Typography>
        </Box>
    }

    const addSyntheticRolesToCollection = async () => {
        const roles = Object.entries(selectedRoles).filter(([_, selected]) => selected).map(([role, _]) => role);
        if (roles.length > 0) {
            const res = await backendApi.post(`synthetic-role/collection/roles/${address}`, {
                roles: roles
            }, {
                headers: getAuthorizationHeader()
            });
            setFetchedRoles(false);
            setShowUpdateRoleButton(false)

        }
    }

    console.log(selectedRoles, collectionRoles)

    function getTabPanel() {
        switch(value) {
          case 0: 
            return <MultipleSelectCard
            options={syntheticRoles.map((role) => ({id:role._id as string, name: role.name}))}
            selected={selectedRoles}
            immutableSelections={collectionRoles.map((role) => role._id as string)}
            onNext={() => {
                addSyntheticRolesToCollection().then(() => {})
            }}
            onSelect={(id, selected) => {
                selectedRoles[id] = selected;
                setSelectedRoles({...selectedRoles});
                setShowUpdateRoleButton(Object.values(selectedRoles).filter((val) => val).length > 0)

            }}
            title=""
            nextButtonTitle="Update Roles"
            hideButton={!showUpdateRoleButton}
        />;
          case 1:
            return <MultipleSelectCard
            options={collectionGuilds.map((guild) => ({id:guild.guildId as string, name: guild.name}))}
            selected={{}}
            immutableSelections={collectionGuilds.map((guild) => guild.guildId as string)}
            onNext={() => {}}
            onSelect={() => {}}
            title=""
            editable={false}
        />
        }
    }


    return <Box sx={{
        width: '100%'
    }}>
        <Header />
        <Box
            sx={{
                paddingX:'5rem',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {getNFTHeader()}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '2rem' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Connected Roles"  />
                    <Tab label="Connected Guilds"  />
                </Tabs>
            </Box>
          {getTabPanel()}
        </Box>

    </Box>
}