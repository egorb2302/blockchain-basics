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
    try {
        const block = await provider.getBlock('latest')
        if (block === null) {
            console.log("Have no blocks yet.")
        } else {
            console.log(block.number, block.timestamp)
        }   
    } catch (err) {
        console.log('getBlock failed: ', err)
    }
}

export const getTx = async (hash: string) => {
    try {
        const tx = await provider.getTransaction(hash)
        console.log(tx)
    } catch (err) {
        console.log('getTx failed: ', err)
    }
}

export const getReceipt = async (hash: string) => {
    try {
        const receipt = await provider.getTransactionReceipt(hash)
        console.log(receipt)
    } catch (err) {
        console.error('getReceipt failed: ', err)
    }
}

export const getGasEstimate = async ({to, value = ethers.parseEther('1.0')}: {to: string, value: bigint}) => {
    try {
        const gasEstimate = await provider.estimateGas({
            to: to,
            value: value
        })
        console.log(gasEstimate)
    } catch (err) {
        console.error('getGasEstimate failed: ', err)
    }
}

export const getFeeData = async () => {
    try {
        const feeData = await provider.getFeeData()
        console.log(feeData.gasPrice, feeData.maxFeePerGas)
    } catch (err) {
        console.error('getFeeData: ', err)
    }
}

export const getNonce = async (adress: string) => {
    try {
        const nonce = await provider.getTransactionCount(adress)
        console.log(nonce)
    } catch (err) {
        console.error('getNonce failed: ', err)
    }
}

export const subscribeOnNewBlock = () => {
    provider.on('block', (blockNumber) => {
        console.log('New block:', blockNumber);
    });
}