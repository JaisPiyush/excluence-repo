import ImageMediaRenderer, { ImageMediaSources } from "../MediaRenderer/ImageMediaRenderer";
import useGetViewportDimension from "@/hooks/useGetViewportDimension";
import { useTheme } from "@mui/material";
import { CSSProperties } from "react";

type BannerImageProps = ImageMediaSources & {
    style?: CSSProperties
}

export default function BannerImage({style = {}, ...props}: BannerImageProps) {
    const theme = useTheme()
    const {width} = useGetViewportDimension({
        width: theme.breakpoints.values.md
    })

    const bannerWidth = typeof window !== 'undefined' ? width - 64: theme.breakpoints.values.lg
    return <ImageMediaRenderer 
        {...props}
        alt="Banner image"
        width={bannerWidth}
        height={280}
        style={{
            alignSelf: 'stretch',
            borderRadius: '0.5rem',
            ...style,
        }}
        mobileHeight={'17.625rem'}
        tabletHeight={'19.5rem'}
        desktopHeight={'22rem'}
    />
}