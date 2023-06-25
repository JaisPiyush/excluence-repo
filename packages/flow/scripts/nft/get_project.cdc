import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

pub fun main(projectID: UInt32): {String: AnyStruct} {
    return  ExcluenceNFT.getQueryProjectData(projectID: projectID).getFullData()
}