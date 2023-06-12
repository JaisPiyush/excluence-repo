import { Box, Typography } from "@mui/material";
import { Header } from "../components/header/Header";
import PermissionsSelector from "../components/add_roles/PermissionsSelector";
import { useEffect, useState } from "react";
import { AllPermissions, GeneralPermissions, TextPermissions, VoicePermissions } from "../components/add_roles/Permissions";
import SyntheticRoleForm from "../components/add_roles/SyntheticRoleForm";
import PermissionWindow from "../components/add_roles/PermissionsWindow";
import AddGuild from "../components/add_roles/AddGuild";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createSyntheticRole, getMyProfiles, getSelectedGuildsBySyntheticRoleId } from "../redux/dashboard";
import { SyntheticRole } from "../types";
import AddCollections from "../components/add_roles/AddCollections";
import { useRouter } from "next/router";
// import {PermissionFlags} from 'discord.js'

export default function AddRoles() {
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({});
    const [selectedGuilds, setSelectedGuilds] = useState<Record<string, boolean>>({})
    const [syntheticRole, setSyntheticRole] = useState<Partial<SyntheticRole>>({})
    const [profiles, fetchedProfiles,
    ] = useAppSelector((state) => [
        state.dashboard.profiles, 
        state.dashboard.fetchedProfiles,
    ]);
    const dispatch = useAppDispatch();
    const updatePermission = (flag: string, selected: boolean) => {
        selectedPermissions[flag] = selected;
        setSelectedPermissions({
            ...selectedPermissions
        });
    }
    const addRoleGuilds = (guildId: string,selected: boolean) => {
        selectedGuilds[guildId] = selected;
        setSelectedGuilds({...selectedGuilds});
    }
    useEffect(() => {
        if(!fetchedProfiles) {
            dispatch(getMyProfiles());
        }
        
    }, []);

    const router = useRouter()

    const handleCreateRole = (contracts: string[]) => {
        let permissions = BigInt('0');
        for (const [permission, selected] of Object.entries(selectedPermissions)) {
            if (selected) {
                permissions = permissions | AllPermissions[permission];
            }
        }
        syntheticRole.permissions = permissions.toString();
        syntheticRole.color = 0;
        syntheticRole.icon = null;
        syntheticRole.unicode_emoji = null;

        // const guildIds
        const param = {
            role: syntheticRole as SyntheticRole,
            guildIds: Object.entries(selectedGuilds).filter(([_, selected]) => selected).map(([guildId, _]) => guildId),
            collections: contracts
        }

        dispatch(createSyntheticRole(param)).then(() => {
            router.back();
        });
    }

    const [pageIndex, setPageIndex] = useState(0);

    function getCurrentPage() {
        switch(pageIndex) {
            
            case 0:
                return <SyntheticRoleForm
                    onNext={(params) => {
                        setSyntheticRole({...params})
                        setPageIndex(1)
                    }}
                />;
            case 1:
                return <PermissionWindow 
                    selectedPermissions={selectedPermissions} 
                    updatePermission={updatePermission} 
                    onNext={() => {
                        if (Object.values(selectedPermissions).filter((perm) => perm).length > 0) {
                            setPageIndex(2)
                        }
                    }} 
                />;
            case 2:
                return <AddGuild 
                    profiles={profiles} 
                    selected={selectedGuilds} 
                    guildsAddedOnServer={[]} 
                    addGuild={addRoleGuilds}
                    onNext={() => {setPageIndex(3)}}
                />
            case 3: 
                return <AddCollections 
                    onNext={handleCreateRole}
                    />
            
        }
    }
    
    
    return <Box sx={{width:'100vw'}}>
        <Header />
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        }}>
            {getCurrentPage()}
        </Box>
    </Box>
}