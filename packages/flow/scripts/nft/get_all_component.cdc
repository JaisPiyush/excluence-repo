import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

pub fun main(): [ExcluenceNFT.Component{ExcluenceNFT.ComponentPublic}] {
    return ExcluenceNFT.getAllComponents()
}