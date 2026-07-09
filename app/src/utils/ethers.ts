import { ethers } from "ethers";
import provider from "../provider/provider";

export const getBalance = async (adress: string): Promise<string | void> => {
    const balance = await provider.getBalance(adress)
    console.log(ethers.formatEther(balance))
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
   const tx = await provider.getTransaction(`0x${hash}`)
   console.log(tx)
}

export const getReceipt = async (hash: string) => {
    const receipt = await provider.getTransactionReceipt(`0x${hash}`)
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

export const sunscribeOnNewBlock = () => {
    provider.on('block', (blockNumber) => {
        console.log('New block:', blockNumber);
    });
}