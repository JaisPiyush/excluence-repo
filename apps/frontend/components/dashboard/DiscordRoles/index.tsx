import { Box, Button } from "@mui/material";
import ProfileCreatedRoles from "./ProfileCreatedRoles";
import { useRouter } from "next/router";

export default function DiscordRoles() {
    const router = useRouter();

    const handleCreateNewRoleClick = () => {
        router.push('/add_roles')
    }
    return <Box sx={{
        width: '40%'
    }}>
        <Button sx={{
            marginBottom: '2rem'
        }} onClick={() => {handleCreateNewRoleClick()}} variant="contained">Create New Role</Button>
        <ProfileCreatedRoles />
    </Box>
}