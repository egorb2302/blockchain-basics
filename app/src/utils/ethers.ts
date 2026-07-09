import { ethers } from "ethers";
import provider from "../provider/provider";

export const getBalance = async (adress: string): Promise<string | void> => {
    try {
        const balance = await provider.getBalance(adress)
        console.log(ethers.formatEther(balance))
    } catch (err) {
        console.error('getBalance failed: ', err)
    }
}

export const getBlock = async (): Promise<string | void> => {
    const block = await provider.getBlock('latest')
    if (block === null) {
        console.log("Have no blocks yet.")
    } else {
        console.log(block.number, block.timestamp)
    }
}

export const getTx = async (hash: string) => {
   const tx = await provider.getTransaction(hash)
   console.log(tx)
}

export const getReceipt = async (hash: string) => {
    const receipt = await provider.getTransactionReceipt(hash)
    console.log(receipt)
}

export const getGasEstimate = async ({to, value = ethers.parseEther('1.0')}: {to: string, value: bigint}) => {
    const gasEstimate = await provider.estimateGas({
        to: to,
        value: value
    })
    console.log(gasEstimate)
}

export const getFeeData = async () => {
    const feeData = await provider.getFeeData()
    console.log(feeData.gasPrice, feeData.maxFeePerGas)
}

export const getNonce = async (adress: string) => {
    const nonce = await provider.getTransactionCount(adress)
    console.log(nonce)
}

export const subscribeOnNewBlock = () => {
    provider.on('block', (blockNumber) => {
        console.log('New block:', blockNumber);
    });
}