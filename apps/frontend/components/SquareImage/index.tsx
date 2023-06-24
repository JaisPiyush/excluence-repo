import ImageMediaRenderer, { ImageMediaSources } from "@/components/MediaRenderer/ImageMediaRenderer"
import { useTheme } from "@mui/material"

import { StaticImageData } from "next/image"


type SquareImageProps = ImageMediaSources

export default function SquareImage(props: SquareImageProps) {
    const theme = useTheme()
    const color = theme.palette.secondary.main
    return <ImageMediaRenderer 
        src={props.src}
        cid={props.cid}
        path={props.path}
        alt="Square Image"
        width={120}
        height={120}
        style={{
            borderRadius: '20px',
            border: `2px solid ${color}`
        }}
    />
}