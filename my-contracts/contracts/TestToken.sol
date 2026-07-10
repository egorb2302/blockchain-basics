// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner, uint256 initialSupply) 
        ERC20('Test Token', "TTK") 
        Ownable(initialOwner)
    {
        _mint(initialOwner, initialSupply);
    }

    function mint(address to, uint256 amount) 
        public
    {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount)
        public
    {
        _burn(to, amount);
    }
}