import { NFTTraits } from "@/utility/types";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import TraitBar from "../TraitBar";
import {ChevronDown} from "react-iconly"

interface TraitHolderProps {
    traits: NFTTraits, 
}

export default function TraitHolder(props: TraitHolderProps) {
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
                        <Typography color="primary.light"  sx={{marginLeft: '0.5rem'}}>({props.traits.traits.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Grid container spacing={2} columns={10}>
                                {
                                    props.traits.traits.map((trait, index) => {
                                        return <Grid item xs={5} key={index}>
                                            <TraitBar {...trait} />
                                        </Grid>
                                    })
                                }
                            </Grid>
                    </AccordionDetails>
                </Accordion>
        </Box>
}