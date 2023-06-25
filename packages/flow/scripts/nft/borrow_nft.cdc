import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"
import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"


pub fun main(address: Address, id: UInt64) {

    let account = getAccount(address)

    let collectionRef = account.getCapability(ExcluenceNFT.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    let _ = collectionRef.borrowNFT(id: id)
}