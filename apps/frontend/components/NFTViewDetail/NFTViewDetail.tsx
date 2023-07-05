import { NFTViewWithContractData } from "@/utility/types"
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import {ChevronDown} from "react-iconly"
import { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TraitHolder from "../TraitHolder";

interface NFTViewDetailProps {
    nft: NFTViewWithContractData;
}

export default function NFTViewDetail(props: NFTViewDetailProps) {



    return <Box sx={{marginTop: '2rem', width: '100%'}}>
                <Accordion sx={{
                    width: '80%'
                }}>
                    <AccordionSummary
                        expandIcon={<ChevronDown set="broken" primaryColor="white"/>}
                        aria-controls="panel1a-content"
                        id="panel1a-description"
                        
                    >
                        <Typography variant="body1" fontWeight={600} >Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ReactMarkdown>
                            {props.nft.description}
                    </ReactMarkdown>
                    </AccordionDetails>
                </Accordion>

                <TraitHolder traits={props.nft.traits} sx={{
                    marginTop: '2rem',
                    width: '80%'
                }} />
            </Box>
}