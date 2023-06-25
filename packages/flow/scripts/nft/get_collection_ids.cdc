// import ExcluenceNFT from "../contracts/ExcluenceNFT.cdc"
import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"

pub fun main(address: Address, collectionPublicPath: PublicPath): [UInt64] {
    let account = getAccount(address)

    let collectionRef = account
        .getCapability(collectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection at specified path")
    
    return  collectionRef.getIDs()
}