import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

pub fun main(id: UInt32): ExcluenceNFT.Component{ExcluenceNFT.ComponentPublic}? {
    return  ExcluenceNFT.getComponent(componentID: id)
}