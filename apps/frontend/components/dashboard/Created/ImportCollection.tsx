import { Modal, Box, Typography } from "@mui/material";

interface ImportCollectionProps {
    open: boolean;
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ImportCollection(props: ImportCollectionProps) {
    return <Modal
                open={props.open}
                onClose={() => {props.handleClose()}}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Import NFT Collection
                    </Typography>
                </Box>
            </Modal>
}