import { Button, Card, Grid, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { ProfileGuild } from "../../redux/dashboard";
import React from "react";

interface AddGuildProps {
    profiles: ProfileGuild[],
    selected: Record<string, boolean>,
    addGuild: (guildId: string, selected: boolean) => void,
    guildsAddedOnServer: string[];
    onNext: () => void;
}

const Item = function({children}: {children: React.ReactNode}) {
    return <Card variant="outlined" sx={{
        paddingX: '0.5rem'
    }} >{children}</Card>
}


export default function AddGuild(props: AddGuildProps) {
    const handleNextClick = () => {
        props.onNext();
    }
    return <Card sx={{
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingY: '1rem',
        paddingX: '2rem',

    }} variant="outlined">
        <Typography variant="h4" sx={{
            alignSelf: 'center',
            fontWeight: 'bold',
            marginBottom: '1rem'
        }} >Add Discord Guild</Typography>
        <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
            {props.profiles.map((profile, index) => (
                <Grid item md={6} key={index}>
                    <Item>
                     <FormControlLabel
                        label={profile.name}
                        control = {
                            <Checkbox 
                                onChange={(e) => {
                                    if (!props.guildsAddedOnServer.includes(profile.guildId)) {
                                        props.addGuild(profile.guildId, !props.selected[profile.guildId] === true)
                                    }
                                }}
                            checked={props.selected[profile.guildId] === true} />
                        }
                        />
                    </Item>
                </Grid>
            ))}
        </Grid>
        <Button onClick={() => {handleNextClick()}} variant="contained" disableElevation sx={{
            marginTop: '2rem'
        }}>Next</Button>

    </Card>
}