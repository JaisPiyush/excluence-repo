export function replaceAddress(code: string, addressMap?: Record<string, string>) {
    let _code = code
    
    for (const [contract, address] of Object.entries({...addressMap, ...globalAddressMap})) {
        _code = _code.replaceAll(contract, address)
    }
    return _code
}

//TODO: Find a better way to replace address
export const globalAddressMap = {
    '"../../contracts/interfaces/NonFungibleToken.interface.cdc"': "0x07b48aa7d91a783d",
    '"./interfaces/NonFungibleToken.interface.cdc"': "0x07b48aa7d91a783d",
    '"../../contracts/interfaces/MetadataViews.interface.cdc"': "0x07b48aa7d91a783d",
    '"./interfaces/MetadataViews.interface.cdc"': "0x07b48aa7d91a783d",
    '"../../contracts/interfaces/FungibleToken.interface.cdc"': "0x07b48aa7d91a783d",
    '"./interfaces/FungibleToken.interface.cdc"': "0x07b48aa7d91a783d",
    '"../../contracts/interfaces/ViewResolver.interface.cdc"': "0x07b48aa7d91a783d",
    '"./interfaces/ViewResolver.interface.cdc"': "0x07b48aa7d91a783d",

}
