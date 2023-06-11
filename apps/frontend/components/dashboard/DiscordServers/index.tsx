import { Box, List } from "@mui/material";
import AddDiscordServer from "./AddDiscordServer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { ProfileGuild, addGuild, getMyProfiles } from "../../../redux/dashboard";
import DiscordServerCard from "./DiscordServerCard";
import { useSession } from "next-auth/react";

export default function DiscordServers() {
    const {data} = useSession();
    const [profiles, fetchedProfiles] = useAppSelector((state) => [
        state.dashboard.profiles, state.dashboard.fetchedProfiles]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(!fetchedProfiles) {
            dispatch(getMyProfiles());
        }
        console.log(data &&  (data as any).guildId !== undefined && fetchedProfiles &&
        profiles.filter((profile) => profile.guildId === (data as any).guildId ).length === 0)
        if (data &&  (data as any).guildId !== undefined && fetchedProfiles &&
            profiles.filter((profile) => profile.guildId === (data as any).guildId ).length === 0) {
                dispatch(addGuild((data as any).guildId));
            }
    }, [])
    // console.log(profiles)
    return <Box sx={{
        width: '40%'
    }}>
        <AddDiscordServer />
        <Box sx={{
            marginTop: '2rem'
        }}>
        {profiles.map((profile) => <DiscordServerCard key={profile.guildId} profileGuild={profile} />)}
        </Box>
    </Box>
}