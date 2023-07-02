import { useMediaQuery } from "@mui/material"
import Image, { ImageLoaderProps, StaticImageData } from "next/image"
import Skeleton from 'react-loading-skeleton'
import darkTheme from "@/styles/theme/darkTheme"
import { CSSProperties, useState } from "react"


export interface ImageMediaSources {
    src?: string | StaticImageData
    cid?: string 
    path?: string
}


type ImageMediaRendererProps = ImageMediaSources & {
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


//TODO: Add fallback image to show on error when loading url
export default function ImageMediaRenderer({gatewayURL = 'https://w3s.link/ipfs/', ...props}: ImageMediaRendererProps) {

    const isDesktop = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('lg'))
    const isTablet = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('md'))
    const isMobile = useMediaQuery((theme: typeof darkTheme) => theme.breakpoints.up('xs'))

    const [isLoading, setIsLoading] = useState(true)

    

    const getWidth = () => {

        if (isDesktop && props.desktopWidth) return props.desktopWidth
        if (isTablet) return props.width || props.tabletWidth
        if (isMobile && props.mobileWidth) return props.mobileWidth
        return props.width
    }

    const getHeight = () => {
        if (isDesktop && props.desktopHeight) return props.desktopHeight
        if (isTablet) return props.height || props.tabletHeight
        if (isMobile && props.mobileHeight) return props.mobileHeight
        return props.height
    }



    let style = props.style || {}

    const getSrc = () => {
        if (props.src) return props.src
        if (props.cid) {
            const ipfsPath = props.cid.replace('ipfs://', '') + (props.path ? `/${props.path}` : '')
            const url = (new URL(ipfsPath, gatewayURL)).toString()
            return url
        }
        throw new Error("Missing `src` for image")
    }

    return <>
        <Image 
            src={getSrc()}
            alt={props.alt}
            width={props.width}
            height={props.height}
            onLoadingComplete={(_) => {
                setIsLoading(false)
            }}
            style={{
                width: isLoading? 0: getWidth(),
                height: isLoading ? 0: getHeight(),
                objectFit: props.objectFit || 'cover',
                visibility: isLoading ? 'hidden': 'visible',
                ...style

            }}
        />
        {
            !isLoading ? <></> : 
            <Skeleton height={getHeight()} width={getWidth()} style={props.loadingStyle} />
        }
        
    </>
}