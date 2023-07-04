import { Box, Modal, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ExModalProps {
    open: boolean;
    onClose: () => void;
}



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'secondary.light',
    outline: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function ExModal(props: ExModalProps & {    
                                        children: ReactNode;
                                        sx?: SxProps
                        }) {
    return <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box sx={{
                    ...style,
                    ...(props.sx || {})
                }}>
                    {props.children}
                </Box>
            </Modal>
}