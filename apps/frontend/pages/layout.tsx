import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { globalActions } from "../redux/global";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
  };

const errorModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'red',
    color: 'white',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
};

export function Layout({children}: {children: React.ReactNode}) {
    const [loading, error] = useAppSelector((state) => [state.global.loading, state.global.error]);
    const dispatch = useAppDispatch();
    return <>
    {children}
    <Modal
        open={loading}
        onClose={() => {}}
    >
        <Box sx={modalStyle}>
          <CircularProgress />
        </Box>
    </Modal>
    <Modal
        open={error !== null}
        onClose={() => {
            dispatch(globalActions.setError(null))
        }}
    >
        <Box sx={errorModalStyle}>
          <Typography>{error} </Typography>
        </Box>
    </Modal>
    </>;
}