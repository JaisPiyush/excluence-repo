import { Button, Card, Grid, Typography, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

interface SelectablePacket {
    id: string;
    name: string;
}

export interface MultipleSelectCardProp {
    options: SelectablePacket[];
    selected: Record<string, boolean>;
    immutableSelections: string[];
    onNext: () => void;
    onSelect: (id: string, selected: boolean) => void;
    title: string;
    nextButtonTitle?: string
    editable?: boolean;
}


const Item = function({children}: {children: React.ReactNode}) {
    return <Card variant="outlined" sx={{
        paddingX: '0.5rem'
    }} >{children}</Card>
}

export default function MultipleSelectCard(props: MultipleSelectCardProp) {
    const handleNextClick = () => {
        props.onNext();
    }

    const getControl = (option: SelectablePacket) => {
        // if (props.editable === false) {
        //     return <></>
        // }
        return <Checkbox 
        onChange={(e) => {
            if (!props.immutableSelections.includes(option.id)) {
                props.onSelect(option.id, !props.selected[option.id] === true)
            }
        }}
    checked={props.selected[option.id] === true} />
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
        }} >{props.title}</Typography>
        <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
            {props.options.map((option) => (
                <Grid item md={6} key={option.id}>
                    <Item>
                     <FormControlLabel
                        label={option.name}
                        control = {getControl(option)}
                        />
                    </Item>
                </Grid>
            ))}
        </Grid>
        <Button onClick={() => {handleNextClick()}} variant="contained" disableElevation sx={{
            marginTop: '2rem'
        }}>{props.nextButtonTitle || 'Next'}</Button>

    </Card>
}