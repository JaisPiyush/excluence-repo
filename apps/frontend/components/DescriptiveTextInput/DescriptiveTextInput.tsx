import { Box, SxProps, TextField, Typography } from "@mui/material";

interface DescriptiveTextInputProps {
    header: string;
    subheader?: string;
    multiline?: boolean;
    placeholder: string;
    required?: boolean;
    value?: string;
    setValue?: (newValue: string) => void;
    rows?: number
    boxSx?: SxProps;
    textFieldSx?: SxProps;
    headerSx?: SxProps;
    error?: boolean;
}

export default function DescriptiveTextInput(props: DescriptiveTextInputProps) {
    return <Box 
                sx={{
                    marginTop: '2rem',
                    ...(props.boxSx || {})
                }}
            >
                <Typography variant="h6">{props.header}</Typography>
                <Typography 
                    color="primary.light" 
                    variant="body2">{props.subheader}</Typography>
                <TextField 
                    multiline={props.multiline || false}
                    rows={props.rows || 1} 
                    variant="outlined"  
                    sx={{
                        width: '100%',
                        marginTop: '1rem',
                        ...(props.textFieldSx || {})
                    }} 
                    placeholder={props.placeholder}
                    required={props.required || false}
                    error={props.error || false}
                    value={props.value}
                    onChange={(e) => {
                        if (props.setValue) {
                            props.setValue(e.target.value);
                        }
                    }}
                />
            </Box>
}