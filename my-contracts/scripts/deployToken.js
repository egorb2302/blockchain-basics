const { ethers } = require("hardhat");

async function deploy() {
    const my_own_address = "0x30a3D61A25AC1440d52EAa1CBdD53ADDec1c8e00"
    console.log('Token deploy on proccess..')

    const TestToken = await ethers.getContractFactory('TestToken');
    const initialSupply = ethers.parseEther("100");

    const token = await TestToken.deploy(my_own_address, initialSupply)
    await token.waitForDeployment();

    const address = await token.getAddress();
    console.log("Token was deployed on address: ", address)

    const [owner] = await ethers.getSigners()
    const name = await token.name()
    const symbol = await token.symbol()
    const totalSupply = await token.totalSupply()
    const ownerBalance = await token.balanceOf(owner.address);

    console.log("Name: ", name)
    console.log("Symbol: ", symbol),
    console.log("TotalSupply: ", totalSupply)
    console.log("Owner balance: ", ownerBalance)
}

deploy().catch(console.error)