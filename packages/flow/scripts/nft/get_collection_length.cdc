import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"

pub fun main(address: Address, collectionPublicPath: PublicPath): Int {
    let account = getAccount(address)

    let collectionRef = account
        .getCapability(collectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}