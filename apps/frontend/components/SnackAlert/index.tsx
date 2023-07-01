import { Alert, AlertColor, Snackbar } from "@mui/material"

interface SnackAlertProps {
    severity?: AlertColor
    error: string | null,
    onClose: () => void
}

export default function SnackAlert(props: SnackAlertProps) {
    return <Snackbar 
                open={props.error !== null} 
                autoHideDuration={6000}
                onClose={() => {props.onClose()}}
            >
                <Alert 
                    onClose={() => {props.onClose()}}
                    severity={props.severity || "error"}>
                        {props.error}
                </Alert>
            </Snackbar>
}