import { useTheme } from "@emotion/react"
import { Box, SxProps, useMediaQuery } from "@mui/material"
import Image from "next/image"
import {ShimmerThumbnail} from "react-shimmer-effects"
import darkTheme from "../../styles/theme/darkTheme"
import { CSSProperties, useState } from "react"


interface ImageMediaRendererProps {
    src: string
    alt: string
    width: number 
    height: number 
    mobileWidth?: number | string
    mobileHeight?: number | string
    tabletHeight?: number | string
    tabletWidth?: number | string
    desktopWidth?: number | string
    desktopHeight?: number | string
    objectFit?: "cover" | "fill" | "contain",
    style?: Omit<CSSProperties, "width" | "height" | "objectFile">
}


export default function ImageMediaRenderer(props: ImageMediaRendererProps) {

    const isDesktop = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('lg'))
    const isTablet = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('lg'))

    const [isLoading, setIsLoading] = useState(true)

    const getWidth = () => {
        if (isDesktop && props.desktopWidth) return props.desktopWidth
        if (isTablet && props.tabletWidth) return props.tabletWidth
        return props.width
    }

    const getHeight = () => {
        if (isDesktop && props.desktopHeight) return props.desktopHeight
        if (isTablet && props.tabletHeight) return props.tabletHeight
        return props.height
    }

    let style: Record<string, string | number> = {
        width: getWidth(),
        height: getHeight(),
        objectFit: props.objectFit || 'cover',

    }

    if (props.style) {
        for (const [key, value] of Object.entries(props.style)) {
            style[key] = value
        }
    }

    
    style['visibility'] = isLoading ? 'hidden': 'visible';


    return <>
        <Image 
            src={props.src} 
            alt={props.alt}
            width={props.width}
            height={props.height}
            style={style}
        />
        {/* {
            !isLoading ? <></> : 
            <ShimmerThumbnail 
                height={250}
            />
        } */}
        <ShimmerThumbnail 
                height={250}
            />
    </>
}