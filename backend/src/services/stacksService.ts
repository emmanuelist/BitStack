import { StacksTestnet, StacksMainnet } from "@stacks/network";
import {
  callReadOnlyFunction,
  makeContractCall,
  standardPrincipalCV,
  stringAsciiCV,
  stringUtf8CV,
} from "@stacks/transactions";
import {
  STACKS_API_URL,
  NETWORK_TYPE,
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
} from "../config/stacks";

const network =
  NETWORK_TYPE === "mainnet" ? new StacksMainnet() : new StacksTestnet();

export const createProfile = async (
  stxAddress: string,
  username: string,
  bio: string
) => {
  try {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "create-profile",
      functionArgs: [stringAsciiCV(username), stringUtf8CV(bio)],
      senderKey: process.env.STACKS_PRIVATE_KEY!, // Be cautious with private keys
      network,
    };

    const transaction = await makeContractCall(txOptions);
    const result = await network.broadcastTransaction(transaction);
    return { success: true, txId: result.txid };
  } catch (error) {
    console.error("Error creating profile on Stacks:", error);
    return { success: false, error };
  }
};

// Implement other Stacks-related functions
