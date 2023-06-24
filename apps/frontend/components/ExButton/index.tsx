import { Button } from "@mui/material";
import { ReactNode } from "react";
import darkTheme from "../../styles/theme/darkTheme";

interface ExButtonProps {
    children: ReactNode,
    isPrimary: boolean,
    onClick?: () => void
}

export default function ExButton(props: ExButtonProps) {
    return <Button onClick={(_) => {
        if (props.onClick) {
            props.onClick()
        }
    }}  disableElevation 
        variant={props.isPrimary ? "contained": "outlined"}
        sx={{
            textTransform: 'unset !important'
        }}
        >
        {props.children}
    </Button>
}