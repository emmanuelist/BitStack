// src/config/stacks.ts

import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const NETWORK_TYPE = process.env.NETWORK_TYPE || "testnet";
export const STACKS_API_URL =
  process.env.STACKS_API_URL || "https://stacks-node-api.testnet.stacks.co";
export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
export const CONTRACT_NAME = process.env.CONTRACT_NAME || "bitstack-core";

export const getNetwork = () => {
  return NETWORK_TYPE === "mainnet" ? new StacksMainnet() : new StacksTestnet();
};

export const getNetworkApiUrl = () => {
  return STACKS_API_URL;
};
