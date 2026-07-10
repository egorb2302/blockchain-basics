// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 private _count;

    function getCount() public view returns (uint256) {
        return _count;
    }

    function increment() public {
        _count++;
    }
}