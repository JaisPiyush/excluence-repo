import { Box, Checkbox, Typography, FormControlLabel } from "@mui/material";

interface PermissionsSelectorProps {
    title: string;
    flags: string[],
    selected: Record<string, boolean>
    updatePermission: (flag: string, selected: boolean) => void;
}

export default function PermissionsSelector(props: PermissionsSelectorProps) {
    return <Box sx={{display: 'flex',
    paddingX: '3rem',
    paddingY: '1rem',
    bgcolor: '#E8E8E8',
    marginX: '1rem',
    flexDirection: 'column'}}>
        <Typography variant="h6">{props.title}</Typography>
        {
            props.flags.map((flag) => {
                return <FormControlLabel
                key={flag}
                label={flag}
                control = {
                <Checkbox 
                    onChange={(e) => {
                        props.updatePermission(flag, !props.selected[flag] === true);
                    }}
                    checked={props.selected[flag] === true} />
                }
                />
            })
        }
    </Box>
}