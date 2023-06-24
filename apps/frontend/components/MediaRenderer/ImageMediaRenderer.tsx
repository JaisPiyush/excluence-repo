import { useTheme } from "@emotion/react"
import { Box, SxProps, useMediaQuery } from "@mui/material"
import Image from "next/image"
import Skeleton from 'react-loading-skeleton'
import darkTheme from "../../styles/theme/darkTheme"
import { CSSProperties, useState } from "react"


interface ImageMediaRendererProps {
    src?: string
    cid?: string 
    path?: string
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
    style?: Omit<CSSProperties, "width" | "height" | "objectFile">,
    loadingStyle?: Omit<CSSProperties, "width" | "height">
    gatewayURL?: string
}


export default function ImageMediaRenderer({gatewayURL = 'https://w3s.link/ipfs/', ...props}: ImageMediaRendererProps) {

    const isDesktop = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('lg'))
    const isTablet = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('md'))

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
    style['height'] = isLoading ? 0: getHeight()
    style['width'] = isLoading? 0: getWidth()

    const getSrc = () => {
        if (props.src) return props.src
        if (props.cid) {
            const ipfsPath = props.cid + (props.path ? `/${props.path}` : '')
            return (new URL(ipfsPath, gatewayURL)).toString()
        }
        throw new Error("Missing `src` for image")
    }


    return <>
        <Image 
            src={getSrc()} 
            alt={props.alt}
            width={props.width}
            height={props.height}
            style={style}
            onLoadingComplete={(_) => {
                setIsLoading(false)
            }}
        />
        {
            !isLoading ? <></> : 
            <Skeleton height={getHeight()} width={getWidth()} style={props.loadingStyle} />
        }
        
    </>
}