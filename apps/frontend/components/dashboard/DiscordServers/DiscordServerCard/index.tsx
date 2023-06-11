import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { ProfileGuild } from "../../../../redux/dashboard"
const discordIcon = 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'

interface DiscordServerCardProp {
    profileGuild: ProfileGuild
}

export default function DiscordServerCard(props: DiscordServerCardProp) {
    return <ListItem sx={{
        bgcolor: '#E8E8E8',
        paddingY: '1rem',
        marginY: '0.5rem'
    }}>
                <ListItemAvatar>
                    <Avatar alt="discord-avatar" src={props.profileGuild.icon || discordIcon} />
                </ListItemAvatar>
                <ListItemText>
                    <Typography>{props.profileGuild.name || `Loading server`}</Typography>
                </ListItemText>
            </ListItem>
}