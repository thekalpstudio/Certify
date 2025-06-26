"use client";
const useSBTApi = () => {
  const baseURL = "https://gateway-api.kalp.studio/v1/contract/kalp";
  const fixedWallet = "ad5b600d5bae6bb145ed6b56e7cd1d6b2bfcb3ab";
  const initialize = async (description: string) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/Initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              description,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  };

  const mintSBT = async (
    recipientAddress: string,
    user_name: string,
    organization: string,
    date_of_issue: string
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/MintSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
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
    }
  };

  const querySBT = async (owner: string, tokenId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/QuerySBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
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
    }
  };

  const getSBTByOwner = async (owner: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/GetSBTByOwner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              owner,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting SBT by owner:", error);
    }
  };

  const getAllTokenIDs = async () => {
    try {
      const response = await fetch(
        `${baseURL}/query/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/GetAllTokenIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting all token IDs:", error);
    }
  };

  const attemptTransfer = async (from: string, to: string, tokenId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/e1yV3tkIGFb9KXuAXb4Ra7gpx4bgSwlL1750852981054/TransferSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
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
    }
  };

  return {
    initialize,
    mintSBT,
    querySBT,
    getSBTByOwner,
    getAllTokenIDs,
    attemptTransfer,
  };
};

export default useSBTApi;
