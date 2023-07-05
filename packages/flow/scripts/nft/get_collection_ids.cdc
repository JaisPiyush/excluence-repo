import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"


pub fun main(address: Address, collectionPublicPathIdentifier: String): [UInt64] {
    let account = getAccount(address)

    let collectionRef = account
        .getCapability(PublicPath(identifier: collectionPublicPathIdentifier)!)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection at specified path")
    
    return  collectionRef.getIDs()
}