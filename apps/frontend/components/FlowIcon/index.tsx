import Image from "next/image"

export function FlowIcon(props: {
    width:  number,
    height:  number
}) {
    return <Image src="https://cryptologos.cc/logos/flow-flow-logo.png" width={props.width} height={props.height} alt="flow icon" />
}