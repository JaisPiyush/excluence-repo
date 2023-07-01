pub fun main(address: Address): PublicAccount.Contracts {
    let account = getAccount(address)
    return account.contracts
}