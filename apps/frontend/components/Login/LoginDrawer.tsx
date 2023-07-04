import { Routes } from "@/utility/routes";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {ChevronDown} from "react-iconly"

interface LoginDrawerProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
}




export default function LoginDrawer(props: LoginDrawerProps) {

    const router = useRouter()

    const handleOnCreateCollectionClick = () => {
       handleOnItemClick(Routes.CreateCollection)
    }

    const handleOnItemClick = (route: string) => {
        router.push(route)
        props.onClose()
    }

    return <SwipeableDrawer
        anchor="right"
        open={props.open}
        onClose={props.onClose}
        onOpen={props.onOpen}
    >

        <Box
        sx={{ width: 250 }}
        role="presentation"
        >
            <List>
                <ListItem key={0} disablePadding>
                    <ListItemButton onClick={() => {handleOnItemClick(Routes.Dashboard)}}>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={1} disablePadding>
                    <Accordion >
                        <AccordionSummary 
                            expandIcon={<ChevronDown set="broken" primaryColor="white"/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Create</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                            <ListItem key={0} disablePadding>
                                <ListItemButton onClick={() => {handleOnCreateCollectionClick()}}>
                                    <ListItemText primary={'Collection'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={0} disablePadding>
                                <ListItemButton onClick={() => {handleOnItemClick(Routes.CreateNFT)}}>
                                    <ListItemText primary={'NFT'} />
                                </ListItemButton>
                            </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            </List>
        </Box>


    </SwipeableDrawer>
}