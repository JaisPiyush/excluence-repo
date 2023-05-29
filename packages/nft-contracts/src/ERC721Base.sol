// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;

import "@chiru-labs/erc721a/extensions/ERC721AQueryable.sol";
import "@chiru-labs/erc721a/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExcluenceERC721Base is ERC721A, ERC721AQueryable, Ownable{

    constructor(string memory name_, string memory symbol_)
        ERC721A(name_, symbol_) Ownable(){}
}