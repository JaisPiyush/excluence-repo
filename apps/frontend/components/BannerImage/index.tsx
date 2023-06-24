import ImageMediaRenderer, { ImageMediaSources } from "../MediaRenderer/ImageMediaRenderer";
import useGetViewportDimension from "@/hooks/useGetViewportDimension";
import { useTheme } from "@mui/material";

type BannerImageProps = ImageMediaSources

export default function BannerImage(props: BannerImageProps) {
    const theme = useTheme()
    const {width} = useGetViewportDimension({
        width: theme.breakpoints.values.md
    })

    const maxWidth = theme.breakpoints.values.lg
    return <ImageMediaRenderer 
        {...props}
        alt="Banner image"
        width={width > maxWidth ? maxWidth: width}
        height={280}
        style={{
            alignSelf: 'stretch'
        }}
        mobileHeight={'15.625rem'}
        tabletHeight={'17.5rem'}
        desktopHeight={'20rem'}
    />
}