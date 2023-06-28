import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import {BiErrorCircle} from "react-icons/bi"

interface CreateCollectionAppDrawerProps {
    currentIndex: number
    onIndexChange: (index: number) => void,
    hasError: Record<number, boolean>,
}

export default function CreateCollectionAppDrawer(props: CreateCollectionAppDrawerProps) {
    const drawerWidth = 300
    return <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                paddingX: '0.5rem'
            },
        }}
        variant="permanent"
        anchor="left"
    >
        <Toolbar>
            <Typography variant="h6" >Create Collection</Typography>
        </Toolbar>
        <Divider />
        <List>
            {['Details', 'Graphics', 'Earnings', 'Socials'].map((text, index) => {
                return <ListItem key={index} >
                    <ListItemButton sx={{
                    bgcolor: props.currentIndex == index ? 'secondary.light': '',
                    borderRadius: '0.5rem'
                }}
                onClick={() => {
                    props.onIndexChange(index)
                }}
                >
                        <ListItemText primary={text} />
                        {props.hasError[index] && (<BiErrorCircle color="red" />)}
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    </Drawer>
}