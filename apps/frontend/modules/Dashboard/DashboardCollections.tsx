import CollectionCard from "@/components/Dashboard/CollectionCard";
import CreateOrImportCollectionCard from "@/components/Dashboard/CreateOrImportCollectionCard";
import { useGetAllCollectionByAddress } from "@/hooks/useGetAllCollectionByAddress";
import { Box } from "@mui/material";

export default function DashboardCollections() {

    const collections = useGetAllCollectionByAddress();

    return <Box sx={{
        display: 'flex',
        flexWrap: 'wrap'
    }}>
        <CreateOrImportCollectionCard />
        {collections.map((collection, index) => <CollectionCard key={index} collection={collection} />)}
    </Box>
}