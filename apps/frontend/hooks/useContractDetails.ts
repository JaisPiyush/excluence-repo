import { SmartContract } from "@thirdweb-dev/react";
import { BaseContract } from "ethers";
import { useEffect, useState } from "react";

export function useContractDetails(contract: SmartContract<BaseContract>) {
    const [supply, setSupply] = useState(0);
    const getDetails = async () => {
        setSupply((await contract.erc721.totalCirculatingSupply()).toNumber())
    }
    useEffect(() => {
        if (contract) {
            getDetails().then(() => {})
        }
    }, [])
    return [supply]
}