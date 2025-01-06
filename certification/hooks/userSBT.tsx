"use client";
const useSBTApi = () => {
  const baseURL = "https://gateway-api.kalp.studio/v1/contract/kalp/";
  const fixedWallet = "a2510d12c6502ba299c2b4b8c107771433b64429";
  const initialize = async (description: string) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/Initialize`,
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
        `${baseURL}/invoke/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/MintSBT`,
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
        `${baseURL}/query/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/QuerySBT`,
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
        `${baseURL}/query/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/GetSBTByOwner`,
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
        `${baseURL}/query/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/GetAllTokenIDs`,
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
        `${baseURL}/query/7ZSLwrP7ga8pKAHD3sVFMBK30HGwEEHl1735894098028/TransferSBT`,
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
