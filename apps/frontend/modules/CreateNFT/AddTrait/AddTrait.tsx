import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, SxProps, Typography } from "@mui/material";
import TraitBar from "../../../components/TraitBar";
import {ChevronDown} from "react-iconly"
import { Trait } from "@/utility/types";
import ExButton from "../../../components/ExButton";
import { useState } from "react";
import AddTraitModal from "@/components/AddTraitModal/AddTraitModal";

interface AddTraitProps {
    traits: Trait[];
    onInsertTraits: (newTraits: Trait[]) => void;
    onRemove: (index: number) => void;
    sx?: SxProps
}

export default function AddTrait(props: AddTraitProps) {


    const [openAddPropertyModal, setOpenAddPropertyModal] = useState(false);


    const handleOnContinueClick = (traits: Trait[]) => {
        setOpenAddPropertyModal(false)
        props.onInsertTraits(traits)
    }

    const handleOnDeleteClick = (index: number) => {
        return () => {
            props.onRemove(index)
        }
    }

    return <Box sx={{
                    width: {
                        xs: '100%',
                        md: 336,
                        lg: 512,
                        xl: 615
                    },
                    borderRadius: '2rem',
                    ...(props.sx || {})
            }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ChevronDown set="broken" primaryColor="white"/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body1" fontWeight={600} >Properties</Typography>
                        <Typography color="primary.light"  sx={{marginLeft: '0.5rem'}}>({props.traits.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Grid container spacing={2} columns={10}>
                                {
                                    props.traits.map((trait, index) => {
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
                            onClick={() => {setOpenAddPropertyModal(true)}}
                            >Add Trait</ExButton>
                    </AccordionDetails>
                </Accordion>

                <AddTraitModal 
                    open={openAddPropertyModal}
                    onClose={() => {setOpenAddPropertyModal(false)}}
                    onContinue={handleOnContinueClick}
                />

            </Box>
}