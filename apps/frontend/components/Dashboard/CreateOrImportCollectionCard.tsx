import { Box } from "@mui/material";
import ExButton from "../ExButton";
import { useRouter } from "next/router";
import { Routes } from "@/utility/routes";

export default function CreateOrImportCollectionCard() {

    const router = useRouter()

    const handleOnCreateCollectionClick = () => {
        router.push(Routes.CreateCollection)
    }

    const handleOnImportCollectionClick = () => {
        router.push(Routes.ImportCollection)
    }

    return <Box sx={{
        width: 300,
        height: 300,
        border: '3px solid',
        borderColor: 'secondary.light',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginX: '0.5rem'
    }}>
        <ExButton isPrimary={true} onClick={handleOnCreateCollectionClick}>Create collection</ExButton>
        <ExButton isPrimary={false} sx={{marginTop: '1rem'}} onClick={handleOnImportCollectionClick}>Import collection</ExButton>
    </Box>
}