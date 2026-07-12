// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Math {
    uint256 private summary;
    
    function add(uint256 number1, uint256 number2) public returns (uint256) {
        return summary += (number1 + number2);
    }

    function mul(uint256 number1, uint256 number2) public returns (uint256) {
        return summary += (number1 * number2);
    }

    function min(uint256 number1, uint256 number2) public returns (uint256) {
        return summary += (number1 - number2);
    }

    function div(uint256 number1, uint256 number2) public returns (uint256) {
        return summary += (number1 / number2);
    }

    function getSummary() view public returns (uint256) {
        return summary;
    }
}