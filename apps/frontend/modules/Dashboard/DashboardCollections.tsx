import CreateOrImportCollectionCard from "@/components/Dashboard/CreateOrImportCollectionCard";
import { Box } from "@mui/material";

export default function DashboardCollections() {
    return <Box sx={{
        display: 'flex',
        flexWrap: 'wrap'
    }}>
        <CreateOrImportCollectionCard />
    </Box>
}