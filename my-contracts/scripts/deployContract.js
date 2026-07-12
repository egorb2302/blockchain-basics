const { ethers } = require("hardhat");
async function main() {
    const Contract = await ethers.getContractFactory("Payment");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log("Contract deployed to:", address);
}
main().catch(console.error);