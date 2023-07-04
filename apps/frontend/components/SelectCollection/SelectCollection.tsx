import { CollectionOnServer } from "@/utility/types";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, SxProps, Typography } from "@mui/material";

interface SelectCollectionProps {
    collections: CollectionOnServer[];
    value?: number;
    setValue: (value: number) => void;
    boxSx?: SxProps
}

export default function SelectCollection(props: SelectCollectionProps) {

    const handleChange = (e: SelectChangeEvent<number>) => {
        props.setValue(parseInt(e.target.value as string));
    }

    return <Box sx={{
        marginTop: '2rem',
        ...(props.boxSx || {})
    }}>
            <Typography variant="h6">Select Collections</Typography>
            <Typography 
                    color="primary.light" 
                    variant="body2"
            >This is the collection where your item will appear.
            </Typography>
            <FormControl fullWidth sx={{
                outline: 'none',
                marginTop: '1rem'
            }}>
                <Select
                    value={props.value}
                    onChange={handleChange}
                    placeholder="No collection"
                >   
                    {
                        props.collections.map((collection, index) => {
                            return <MenuItem value={index} key={index}>{collection.contractName}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
    </Box>
}