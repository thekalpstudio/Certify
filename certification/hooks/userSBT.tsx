"use client";

import { useState, useEffect } from "react";

interface ContractInfo {
  contractName: string;
  fixedWallet: string;
  apiKey: string;
}

const CONTRACT_INFO: Record<string, ContractInfo> = {
  TESTNET: {
    contractName: "e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054",
    fixedWallet: "ad5b600d5bae6bb145ed6b56e7cd1d6b2bfcb3ab",
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  },
  MAINNET: {
    contractName: "certify-digitalsouth-cc",
    fixedWallet: "c5dc4d4947022bc88e3446296b084eaa00582343",
    apiKey:
      "6dfc7922667aec274e941bfdbe52a5303fab3b955fb3e3328b2e72f5fcee221477b056df08780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003",
  },
};

const useSBTApi = (network: string) => {
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);

  useEffect(() => {
    const info = CONTRACT_INFO[network];
    if (info) {
      setContractInfo(info);
    } else {
      setContractInfo(null);
    }
  }, [network]);

  const baseURL = "https://gateway-api.kalp.studio/v1/contract/kalp";

  const initialize = async (description: string) => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot initialize contract.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/invoke/${contractInfo.contractName}/Initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
            args: {
              description,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error initializing contract:", error);
      return null;
    }
  };

  const mintSBT = async (
    recipientAddress: string,
    user_name: string,
    organization: string,
    date_of_issue: string
  ) => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot mint SBT.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/invoke/${contractInfo.contractName}/MintSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
            args: {
              address: recipientAddress,
              name: user_name,
              organization: organization,
              dateOfIssue: date_of_issue,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error minting SBT:", error);
      return null;
    }
  };

  const querySBT = async (owner: string, tokenId: string) => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot query SBT.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/query/${contractInfo.contractName}/QuerySBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
            args: {
              owner,
              tokenID: tokenId,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error querying SBT:", error);
      return null;
    }
  };

  const getSBTByOwner = async (owner: string, networkType?: string) => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot get SBT by owner.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/query/${contractInfo.contractName}/GetSBTByOwner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: networkType || network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
            args: {
              owner,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting SBT by owner:", error);
      return null;
    }
  };

  const getAllTokenIDs = async () => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot get all token IDs.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/query/${contractInfo.contractName}/GetAllTokenIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting all token IDs:", error);
      return null;
    }
  };

  const attemptTransfer = async (from: string, to: string, tokenId: string) => {
    if (!contractInfo) {
      console.error("Contract info not set. Cannot attempt transfer.");
      return null;
    }

    try {
      const response = await fetch(
        `${baseURL}/query/${contractInfo.contractName}/TransferSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": contractInfo.apiKey,
          },
          body: JSON.stringify({
            network: network,
            blockchain: "KALP",
            walletAddress: contractInfo.fixedWallet,
            args: {
              from,
              to,
              tokenID: tokenId,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error(
        "Error attempting to transfer SBT (non-transferable):",
        error
      );
      return null;
    }
  };

  return {
    initialize,
    mintSBT,
    querySBT,
    getSBTByOwner,
    getAllTokenIDs,
    attemptTransfer,
    contractInfo,
    setContractInfo,
    isReady: !!contractInfo,
  };
};

export default useSBTApi;
