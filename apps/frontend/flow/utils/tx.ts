import * as fcl from "@onflow/fcl"

const noop = async () => {}

export interface TxOpts {
    onStart?: () => void,
    onSubmission?: (txId: string) => void,
    onUpdate?: () => void,
    onSuccess?: (txStatus: any) => void,
    onError?: (error: Error) => void,
    onComplete?:() => void,
}

interface TxMods {
    cadence: string,
    args?: fcl.ArgsFn,
    limit?: number
}

export async function tx(mods: TxMods, opts: TxOpts = {}) {
    const onStart = opts.onStart || noop
    const onSubmission = opts.onSubmission || noop
    const onUpdate = opts.onUpdate || noop
    const onSuccess = opts.onSuccess || noop
    const onError = opts.onError || noop
    const onComplete = opts.onComplete || noop
    var txId: string = ""
    try {
        onStart()
        txId = await fcl.mutate({
            cadence: mods.cadence,
            args: mods.args,
            limit: mods.limit,
        })
        console.info(
        `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
        "color:purple;font-weight:bold;font-family:monospace;"
        )
        onSubmission(txId)
        const unsub = await fcl.tx(txId).subscribe(onUpdate)
        const txStatus = await fcl.tx(txId).onceSealed()
        unsub()
        console.info(
        `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
        "color:green;font-weight:bold;font-family:monospace;"
        )
        await onSuccess(txStatus)
        return txStatus
    } catch (error) {
        console.error(error)
        // console.error(
        // `TX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
        // error
        // )
        onError(error as Error)
    } finally {
        await onComplete()
    }
}

export function fvsTx(env: string, txId: string) {
  return `https://flow-view-source.com/${env}/tx/${txId}`
}