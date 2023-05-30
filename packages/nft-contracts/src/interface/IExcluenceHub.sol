// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;


interface IExcluenceHub {

    /**
     * The contract stores address of all the Excluence' contracts used in daily ops such as PlatformFee.
     * 
     * @param id identifier for the contract in the hub
     * The identifier will be keccak256 hash for contracts name in small-case
     * id for PlatformFee will be keccak256("platform-fee")
     */
    function getContract(bytes32 id) external returns(address);
}