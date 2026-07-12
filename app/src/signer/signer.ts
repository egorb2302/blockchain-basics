import provider from '../provider/provider';
import ContractArtifact from'../../../my-contracts/artifacts/contracts/TestTransaction.sol/Payment.json';
import { ethers } from "ethers";

const hardhatProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
// это поле нужно будет заполнить самостоятельно после команд в README
const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

export const createSignerFromPrivateKey = (pk: string) => {
    const signer = new ethers.Wallet(`0x${pk}`, provider);
    console.log('Signer from private key was successfylly created: ', signer)
}

export const createSignerFromSeedPhrase = (sp: string) => {
    const signer = ethers.Wallet.fromPhrase(sp)
    console.log('Signer from seed phrase was successfylly created: ', signer)
}

export const createSignerFromMetaMask = async () => {
    const browserProvider = new ethers.BrowserProvider(window.ethereum)
    const signer = await browserProvider.getSigner();
    console.log('Signer from seed phrase was successfylly created: ', signer)
}

export const createRandomWallet = () => {
    const randomWallet = ethers.Wallet.createRandom()
    console.log('Random wallet was sucessfully created: ', 
        randomWallet.address, 
        randomWallet.privateKey, 
        randomWallet.mnemonic?.phrase)
}

export const transaction = async (to: string, value: string) => {
    const signer = await provider.getSigner()

    const tx = await signer.sendTransaction({
        to: to,
        value: ethers.parseEther(value)
    })

    await tx.wait()
}

export const getSupply = async (from: string, to: string, value: string) => {
    const signer = await hardhatProvider.getSigner(from);
    const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(value),
    });
    await tx.wait();
    return tx.hash;
};

export const contractTx = async (to: string, value: string) => {
    const signer = await hardhatProvider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractArtifact.abi, signer);
 
    const tx = await contract.sendTo(to, ethers.parseEther(value));
    await tx.wait();
    return tx.hash;
};
 
export const contractDeposit = async (value: string) => {
    const signer = await hardhatProvider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractArtifact.abi, signer);
 
    const deposit = await contract.deposit({
        value: ethers.parseEther(value),
    });
    await deposit.wait();
};
 
export const getContractBalance = async () => {
    const signer = await hardhatProvider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractArtifact.abi, signer);
    const balance = await contract.balances(await signer.getAddress());
    return ethers.formatEther(balance);
};