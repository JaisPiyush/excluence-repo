import { Trait } from "@/utility/types";
import { Box, Typography } from "@mui/material";
import {CloseSquare} from 'react-iconly'

type TraitBarProps = Trait & {
    onDelete?: () => void;
}

export default function TraitBar(props: TraitBarProps) {
    return <Box sx={{
                paddingX: '1rem',
                paddingY: '0.6rem',
                borderRadius: '0.5rem',
                bgcolor:'secondary.light',
                width: '100%'
            }}
            >
                <Typography 
                    variant='caption'
                    fontWeight={600}
                >{props.name.toUpperCase()}</Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body1">{props.value}</Typography>
                    {
                        props.onDelete? <CloseSquare set="bold" primaryColor="blueviolet"/>: <></>
                    }
                </Box>
                
            </Box>
}