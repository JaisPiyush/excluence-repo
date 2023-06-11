import { Box, Typography } from "@mui/material";
import { Header } from "../components/header/Header";
import PermissionsSelector from "../components/add_roles/PermissionsSelector";
import { useEffect, useState } from "react";
import { GeneralPermissions, TextPermissions, VoicePermissions } from "../components/add_roles/Permissions";
import SyntheticRoleForm from "../components/add_roles/SyntheticRoleForm";
import PermissionWindow from "../components/add_roles/PermissionsWindow";
import AddGuild from "../components/add_roles/AddGuild";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMyProfiles, getSelectedGuildsBySyntheticRoleId } from "../redux/dashboard";
// import {PermissionFlags} from 'discord.js'

export default function AddRoles() {
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({});
    const [selectedRoles, setSelectedRoles] = useState<Record<string, boolean>>({})
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
        selectedRoles[guildId] = selected;
        setSelectedRoles({...selectedRoles});
    }
    useEffect(() => {
        // if(!fetchedGuildRoles){
        //     dispatch(getSelectedGuildsBySyntheticRoleId())
        // }
        if(!fetchedProfiles) {
            dispatch(getMyProfiles());
        }
        
    }, []);
    
    
    return <Box sx={{width:'100vw'}}>
        <Header />
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        }}>
        {/* <PermissionWindow selectedPermissions={selectedPermissions} updatePermission={updatePermission} /> */}
        {/* <AddGuild profiles={profiles} selected={selectedRoles} guildsAddedOnServer={[]} addGuild={addRoleGuilds}/> */}
        </Box>
    </Box>
}