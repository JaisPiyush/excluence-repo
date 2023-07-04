import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import TraitBar from "../TraitBar";
import {ChevronDown} from "react-iconly"
import { Trait } from "@/utility/types";
import { useState } from "react";
import ExButton from "../ExButton";

interface AddTraitProps {}

export default function AddTrait(props: AddTraitProps) {


    const [traits, setTraits] = useState<Trait[]>([]);

    const handleOnDeleteClick = (index: number) => {
        return () => {
            setTraits(traits.filter((_, i) => i !== index ))
        }
    }

    return <Box sx={{
                    width: {
                        xs: '100%',
                        md: 336,
                        lg: 512,
                        xl: 615
                    },
                    borderRadius: '2rem'
            }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ChevronDown set="broken" primaryColor="white"/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body1" fontWeight={600} >Properties</Typography>
                        <Typography color="primary.light"  sx={{marginLeft: '0.5rem'}}>({traits.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Grid container spacing={2} columns={10}>
                                {
                                    traits.map((trait, index) => {
                                        return <Grid item xs={5} key={index}>
                                            <TraitBar {...trait} onDelete={handleOnDeleteClick(index)} />
                                        </Grid>
                                    })
                                }
                            </Grid>
                            <ExButton isPrimary
                                sx={{
                                    width: '100%',
                                    marginTop: '1rem'
                                }}
                            >Add Trait</ExButton>
                    </AccordionDetails>
                </Accordion>
            </Box>
}