import { Button } from "@mui/material";
import * as fcl from "@onflow/fcl"

export default function LoginButton() {

    
    return <Button variant="contained" 
        onClick={() => {
            fcl.authenticate()
        }}
    >Log In</Button>
}