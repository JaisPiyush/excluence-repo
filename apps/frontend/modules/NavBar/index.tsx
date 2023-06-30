import LoginButton from "@/components/Login/LoginButton";
import { useAppDispatch } from "@/redux-store/index"
import * as fcl from "@onflow/fcl"
import { useEffect, useState } from "react";
import { accountActions } from "@/redux-store/account";
import { User } from "@/utility/types";
import { useAccount } from "@/hooks/useAccount";
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import {User as UserIcon} from "react-iconly"
import LoginDrawer from "@/components/Login/LoginDrawer";

export default function NavBar() {

    const user = useAccount()
    const dispatch = useAppDispatch()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const setUser = (_u: User) => {
        dispatch(accountActions.setUser(_u))
    }

    useEffect(() => {fcl.currentUser.subscribe(setUser)}, [])

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false)
    }

    const displayLoginState = () => {
        if (user.loggedIn) {
            const addr = user.addr as string
            return <div>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleDrawerOpen()
                    }}
                    startIcon={<UserIcon set="broken" primaryColor="blueviolet"/>}
                    >{addr}
                </Button>
                <LoginDrawer open={isDrawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />

            </div>
        }
        return <LoginButton />
    }


    return <Box
     sx={{
        flexGrow: 1
     }}
    >

        <AppBar position="static" sx={{bgcolor: 'black'}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Excluence</Typography>
                {displayLoginState()}
            </Toolbar>
        </AppBar>
    </Box>
}