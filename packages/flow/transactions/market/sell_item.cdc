import FlowToken from 0x0ae53cb6e3f42a79
import FungibleToken from "../../contracts/interfaces/FungibleToken.interface.cdc"
import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import NFTStorefrontV2 from "../../contracts/NFTStorefrontV2.cdc"

/// Transaction used to facilitate the creation of the listing under the signer's owned storefront resource.
/// It accepts the certain details from the signer,i.e. - 
///
/// `saleItemID` - ID of the NFT that is put on sale by the seller.
/// `saleItemPrice` - Amount of tokens (FT) buyer needs to pay for the purchase of listed NFT.
/// `customID` - Optional string to represent identifier of the dapp.
/// `commissionAmount` - Commission amount that will be taken away by the purchase facilitator.
/// `expiry` - Unix timestamp at which created listing become expired.
/// `marketplacesAddress` - List of addresses that are allowed to get the commission.

/// If the given nft has a support of the RoyaltyView then royalties will added as the sale cut.

transaction(
    saleItemID: UInt64,
    saleItemPrice: UFix64, 
    customID: String?, 
    commissionAmount: UFix64, 
    expiry: UInt64, 
    marketplacesAddress: [Address],
    collectionStoragePath: StoragePath
) {
    let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let nftProvider: Capability<&AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefrontV2.Storefront
    var saleCuts: [NFTStorefrontV2.SaleCut]
    var marketplacesCapability: [Capability<&AnyResource{FungibleToken.Receiver}>]

    prepare(acct: AuthAccount) {
        self.saleCuts = []
        self.marketplacesCapability = []
        

    }
}