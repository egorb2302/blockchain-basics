import { ethers } from "ethers";
import provider from "../provider/provider";
import type { ProviderPropType } from "../types/types";
import { TestTokenAbi } from "../abi/TestToken";

export const getBalance = async (address: string): Promise<ProviderPropType | void> => {
  try {
    const balance = await provider.getBalance(address);
    return { type: "balance", address, value: ethers.formatEther(balance) };
  } catch (err) {
    console.error("getBalance failed:", err);
  }
};

export const getBlock = async (): Promise<ProviderPropType | void> => {
  try {
    const block = await provider.getBlock("latest");
    if (!block) {
      console.log("Have no blocks yet.");
      return;
    }
    return { type: "block", number: block.number, timestamp: block.timestamp };
  } catch (err) {
    console.error("getBlock failed:", err);
  }
};

export const getTx = async (hash: string): Promise<ProviderPropType | void> => {
  try {
    const tx = await provider.getTransaction(hash);
    if (!tx) {
      console.log("Transaction not found.");
      return;
    }
    return {
      type: "tx",
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: ethers.formatEther(tx.value),
    };
  } catch (err) {
    console.error("getTx failed:", err);
  }
};

export const getReceipt = async (hash: string): Promise<ProviderPropType | void> => {
  try {
    const receipt = await provider.getTransactionReceipt(hash);
    if (!receipt) {
      console.log("Receipt not found.");
      return;
    }
    return {
      type: "receipt",
      hash: receipt.hash,
      status: receipt.status,
      gasUsed: receipt.gasUsed.toString(),
    };
  } catch (err) {
    console.error("getReceipt failed:", err);
  }
};

export const getGasEstimate = async (to: string): Promise<ProviderPropType | void> => {
  try {
    const gasEstimate = await provider.estimateGas({ to, value: BigInt(0) });
    return { type: "gas", estimate: gasEstimate.toString() };
  } catch (err) {
    console.error("getGasEstimate failed:", err);
  }
};

export const getFeeData = async (): Promise<ProviderPropType | void> => {
  try {
    const feeData = await provider.getFeeData();
    return {
      type: "fee",
      gasPrice: feeData.gasPrice?.toString() ?? null,
      maxFeePerGas: feeData.maxFeePerGas?.toString() ?? null,
    };
  } catch (err) {
    console.error("getFeeData failed:", err);
  }
};

export const getNonce = async (address: string): Promise<ProviderPropType | void> => {
  try {
    const nonce = await provider.getTransactionCount(address);
    return { type: "nonce", address, value: nonce };
  } catch (err) {
    console.error("getNonce failed:", err);
  }
};

export const subscribeOnNewBlock = () => {
  provider.on("block", (blockNumber) => {
    console.log("New block:", blockNumber);
  });
};

export const getTokenBalance = async (tokenAdress: string, userAdress: string): Promise<ProviderPropType | void> => {
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
  const contract = new ethers.Contract(tokenAdress, TestTokenAbi , provider);

  const balanceRaw = await  contract.balanceOf(userAdress)
  const decimals = await contract.decimals()
  const symbol = await contract.symbol()

  const formatted = ethers.formatUnits(balanceRaw, decimals)

  return { type: 'tokenBalance', value: `Balance: ${formatted} ${symbol}`, address: userAdress, token: tokenAdress }; 
}