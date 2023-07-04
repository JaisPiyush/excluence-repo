import { CardActions, CardContent, CardHeader, Grid, IconButton, TextField } from "@mui/material";
import ExModal, { ExModalProps } from "../ExModal/ExModal";
import {CloseSquare} from 'react-iconly'
import { useState } from "react";
import ExButton from "../ExButton";
import { Trait } from "@/utility/types";

type AddTraitModalProps = ExModalProps & {
    onContinue: (traits: Trait[]) => void;
}

function TraitInput(props: {
    name: string;
    setName: (newValue: string) => void;
    value: string;
    setValue: (newValue: string) => void;
    onDelete: () => void;
}) {
    return <Grid container columns={12} columnSpacing={2}>
                <Grid item xs={5}>
                    <TextField
                        placeholder={'e.g Size'}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        placeholder={'e.g M'}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={2}>
                    <IconButton onClick={() => {props.onDelete()}}>
                        <CloseSquare set="bold" primaryColor="blueviolet"/>
                    </IconButton>
                </Grid>
    </Grid>
}

export default function AddTraitModal(props: AddTraitModalProps) {

    const [traitNames, setTraitNames] = useState<string[]>([]);
    const [traitValues, setTraitValues] = useState<string[]>([]);

    const handleSetValue = (index: number) => {
        return (newValue: string) => {
            traitValues[index] = newValue;
            setTraitValues([...traitValues]);
        }
    }

    const handleSetName = (index: number) => {
        return (newValue: string) => {
            traitNames[index] = newValue;
            setTraitNames([...traitNames]);
        }
    }

    const handleRemoveTrait = (index: number) => {
        return () => {
            setTraitNames(traitNames.filter((_, i) => index !== i ))
            setTraitValues(traitValues.filter((_, i) => i !== index))
        }
    }

    const handleAddPropertyClick = () => {
        traitNames.push('')
        traitValues.push('')
        setTraitNames([...traitNames])
        setTraitValues([...traitValues])
    }

    const handleOnContinueClick = () => {
        let traits: Trait[] = [];
        for (let i = 0; i < traitNames.length; i++) {
            if (traitNames[i] && traitNames[i].length > 0 && 
                traitValues[i] && traitValues[i].length > 0
                ) {
                    traits.push({
                        name: traitNames[i],
                        value: traitValues[i]
                    })
                }
        }

        props.onContinue(traits);
    }

    return <ExModal 
                open={props.open} 
                onClose={props.onClose}
                sx={{
                    px:1,
                    borderRadius: '0.5rem',
                    width: {
                        xs: '95%',
                        md: 600
                    }
                }}
            >
                <CardHeader subheader="Add Property" />
                <CardContent>
                    {
                        traitNames.map((name, index) => {
                            return <TraitInput 
                                        key={index}
                                        name={name}
                                        value={traitValues[index]}
                                        setName={handleSetName(index)}
                                        setValue={handleSetValue(index)}
                                        onDelete={handleRemoveTrait(index)}
                                    />
                        })
                    }
                </CardContent>
                <CardActions>
                    <ExButton isPrimary={false} sx={{
                            width: '50%'
                        }}
                        onClick={() => {handleAddPropertyClick()}}
                    >Add Property</ExButton>
                    <ExButton isPrimary sx={{
                            width: '50%'
                        }}
                        onClick={() => {handleOnContinueClick()}}
                    >Continue</ExButton>
                </CardActions>
         
            </ExModal>
}