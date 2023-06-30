import { ReactNode, createContext, useContext } from "react";

interface SwitchProps {
    value: unknown,
    children: ReactNode
}

const SwitchContext = createContext<unknown | undefined>(undefined)
export function Switch(props: SwitchProps) {
    return <SwitchContext.Provider value={props.value}>
        {props.children}
    </SwitchContext.Provider>
}

interface SwitchCaseProps {
    case?: unknown;
    children: ReactNode
}
export function SwitchCase(props: SwitchCaseProps) {
    const switchValue = useContext(SwitchContext)
    if (switchValue === props.case) return props.children
    return <></>
}