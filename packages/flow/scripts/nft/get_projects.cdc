import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

pub fun main(): [{String: AnyStruct}] {
    return  ExcluenceNFT.getAllProjectsData()
}