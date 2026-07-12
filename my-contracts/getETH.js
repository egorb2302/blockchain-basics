const { ethers } = require("hardhat");

export async function main() {
    const MY_ADDRESS = "0x30a3D61A25AC1440d52EAa1CBdD53ADDec1c8e00";
    
    const [owner] = await ethers.getSigners();
    
    console.log("Отправитель:", owner.address);
    console.log("Баланс отправителя до:", ethers.formatEther(
        await ethers.provider.getBalance(owner.address)
    ), "ETH");
    
    const tx = await owner.sendTransaction({
        to: MY_ADDRESS,
        value: ethers.parseEther("100")
    });
    
    await tx.wait();
    
    console.log("✅ Отправлено 100 ETH на", MY_ADDRESS);
    console.log("Хэш транзакции:", tx.hash);
    
    const receiverBalance = await ethers.provider.getBalance(MY_ADDRESS);
    console.log("Баланс получателя:", ethers.formatEther(receiverBalance), "ETH");
}

main().catch(console.error);