import { Button } from "@mui/material";
import { ReactNode } from "react";
import darkTheme from "../../styles/theme/darkTheme";

interface ExButtonProps {
    children: ReactNode,
    isPrimary: boolean
}

export default function ExButton(props: ExButtonProps) {
    return <Button  disableElevation variant={props.isPrimary ? "contained": "outlined"}>
        {props.children}
    </Button>
}