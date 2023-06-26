import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

transaction(projectID: UInt32, componentIDs: [UInt32]) {

    let adminRef: &ExcluenceNFT.Admin
    let componentNextID: UInt32

    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&ExcluenceNFT.Admin>(from: ExcluenceNFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.componentNextID = ExcluenceNFT.nextComponentID
    }

    execute {
        let projectRef = self.adminRef.borrowProject(projectID: projectID)
        projectRef.addComponents(componentIDs: componentIDs)
    }

    post {
        ExcluenceNFT.nextComponentID == self.componentNextID + UInt32(componentIDs.length) - 1:
        "Failed to add all the components in the project"
    }
} 