import { GeneralPermissions, TextPermissions, VoicePermissions } from "./Permissions";
import PermissionsSelector from "./PermissionsSelector";
import { Box, Button, Card, CardHeader, Typography } from "@mui/material";

interface PermissionWindowProps {
    selectedPermissions: Record<string, boolean>;
    updatePermission: (flag: string, selected: boolean) => void;
    onNext: () => void;
}

export default function PermissionWindow(props: PermissionWindowProps) {
    const generalPermissions: string[] = Object.keys(GeneralPermissions);
    const textPermissions: string[] = Object.keys(TextPermissions);
    const voicePermissions: string[] = Object.keys(VoicePermissions)
    return <Card sx={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingY: '1rem',
        paddingX: '2rem'
    }} variant="outlined">
        <Typography variant="h4" sx={{
            alignSelf: 'center',
            fontWeight: 'bold'
        }} >Permissions</Typography>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', marginY: '2rem'}}>
            <PermissionsSelector title="General Permissions" flags={generalPermissions} selected={props.selectedPermissions} updatePermission={props.updatePermission} />
            <PermissionsSelector title="Text Permissions" flags={textPermissions} selected={props.selectedPermissions} updatePermission={props.updatePermission} />
                <PermissionsSelector title="Voice Permissions" flags={voicePermissions} selected={props.selectedPermissions} updatePermission={props.updatePermission} />
        </Box>
        <Button sx={{
            paddingY: '0.8rem'
        }} variant="contained" onClick={() => {props.onNext()}}>Next</Button>
    </Card>
}