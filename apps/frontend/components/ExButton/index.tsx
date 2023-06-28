import { Button, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface ExButtonProps {
    children: ReactNode,
    isPrimary: boolean,
    onClick?: () => void
    sx?: SxProps
}

export default function ExButton(props: ExButtonProps) {
    const sx = props.sx || ({} as SxProps)
    
    // sx.textTransform = sx.textTransform || 'unset !important'
    
    return <Button onClick={(_) => {
        if (props.onClick) {
            props.onClick()
        }
    }}  disableElevation 
        variant={props.isPrimary ? "contained": "outlined"}
        sx={{
            textTransform: 'unset !important',
            ...sx
        }}
        >
        {props.children}
    </Button>
}