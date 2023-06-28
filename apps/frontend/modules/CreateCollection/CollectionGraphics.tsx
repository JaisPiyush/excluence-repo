import MediaSelector from "@/components/CreateCollection/MediaSelector";
import SectionHeader from "@/components/CreateCollection/SectionHeader";
import { CreateCollectionContext } from "@/contexts/create_collection_context";
import { Box } from "@mui/material";
import { useContext, useState } from "react";

interface CollectionGraphicsProps {

}

export default function CollectionGraphics(props: CollectionGraphicsProps) {

    const createCollectionContext = useContext(CreateCollectionContext)

    const [uploadedSquareImage, setUploadedSquareImage] = useState<string| undefined>(createCollectionContext.squareImage || undefined)
    const [uploadedBannerImage, setUploadedBannerImage] = useState<string | undefined>(createCollectionContext.bannerImage || undefined)

    const handleOnNextClick = () => {}
    return <Box>
        <SectionHeader 
                    heading="Collection graphics" 
                    onNexClick={handleOnNextClick}
        />
        <Box>
            <MediaSelector 
                uploadedImage={uploadedSquareImage}
                setUploadedImage={setUploadedSquareImage}
                heading="Square Image*"
                subheader={<span>This image will also be used for display purposes.<br/>
                    At least 300x300 pixels, max. size 5MB, GIF, JPEG or PNG</span>}
            />
            <MediaSelector 
                uploadedImage={uploadedBannerImage}
                setUploadedImage={setUploadedBannerImage}
                heading="Banner Image*"
                subheader={<span>This image will appear at the top of your collection page.<br/>
                    At least 1400x350 pixels, max. size 5MB, GIF, JPEG or PNG</span>}
            />
        </Box>
    </Box>
}