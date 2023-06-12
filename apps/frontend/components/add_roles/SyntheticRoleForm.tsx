import { Card, TextField, FormControlLabel, Switch, Button, Typography } from "@mui/material";
import { useState } from "react";

interface SyntheticRoleFormProps {
    onNext: (params: {hoist: boolean, mentionable: boolean, name: string}) => void
}

export default function SyntheticRoleForm(props: SyntheticRoleFormProps) {
    const [hoist, setHoist] = useState(true);
    const [mentionable, setMentionable] = useState(true);
    const [name, setName] = useState<string>('');

    const handleNextClick = () => {
        if (name !== null && name !== '') {
            props.onNext({name, hoist, mentionable})
        }
    }

    return <Card sx={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingY: '1rem',
        paddingX: '2rem'

    }} variant="outlined">
        <Typography variant="h4" sx={{
            alignSelf: 'center',
            fontWeight: 'bold'
        }} >Create Role</Typography>
        <TextField
          required
          id="outlined-required"
          label="Role Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormControlLabel sx={{
            marginY: '2rem'
        }} control={<Switch checked={hoist} onChange={(e) => {setHoist(e.target.checked)}} />} label="Hoist (if this role is pinned in the user listing)" />
        <FormControlLabel sx={{
        
        }} control={<Switch checked={mentionable} onChange={(e) => {setMentionable(e.target.checked)}} />} label="Mentionable (whether this role is mentionable)" />
        <Button onClick={() => {handleNextClick()}} variant="contained" disableElevation sx={{
            marginTop: '2rem'
        }}>Next</Button>
    </Card>
}