import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { ProfileGuild } from "../../../../redux/dashboard"
import {discordIcon} from '../../../../constant'


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