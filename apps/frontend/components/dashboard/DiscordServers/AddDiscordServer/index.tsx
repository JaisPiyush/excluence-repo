import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function AddDiscordServer() {
    const handleClick = async () => {
        signIn('discord_bot')
    }
    return <Button onClick={() => {handleClick()}} variant="contained">Add Discord Server</Button>
}