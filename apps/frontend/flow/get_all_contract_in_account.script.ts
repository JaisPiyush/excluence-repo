import * as fcl from "@onflow/fcl"
import GET_ALL_CONTRACT_IN_ACCOUNT from "@excluence-repo/flow/scripts/user/get_all_contract_in_account.cdc"

export async function fetchAllContractsInAccount(addr?: string) {
    if (!addr){
        addr = (await fcl.currentUser.snapshot()).addr
    }
    return await fcl.query({
        cadence: GET_ALL_CONTRACT_IN_ACCOUNT,
        args: (arg,t) => [
            arg(addr, t.Address)
        ]
    })
}