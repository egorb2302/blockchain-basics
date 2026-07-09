import provider from '../provider/provider';
import { ethers } from "ethers";

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