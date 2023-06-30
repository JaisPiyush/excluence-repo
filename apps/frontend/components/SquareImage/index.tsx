import ImageMediaRenderer, { ImageMediaSources } from "@/components/MediaRenderer/ImageMediaRenderer"
import { useTheme } from "@mui/material"
import { CSSProperties } from "react"

type SquareImageProps = ImageMediaSources  & {
    style?: CSSProperties
}

export default function SquareImage({style = {}, ...props}: SquareImageProps) {
    const theme = useTheme()
    const color = theme.palette.secondary.main
    return <ImageMediaRenderer 
        src={props.src}
        cid={props.cid}
        path={props.path}
        alt="Square Image"
        width={132}
        height={132}
        style={{
            borderRadius: 66,
            ...style
        }}
    />
}