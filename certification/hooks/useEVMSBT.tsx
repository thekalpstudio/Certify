"use client";
// Example API hook structure

const useEVMSBTApi = () => {
  const baseURL = "https://dev-ks-gatewayapi.p2eppl.com/v1/contract/evm";
  const fixedWallet = "0xaCB11145EEE3dE2179B2853C9469A03344d550e4";
  const initialize = async (description: string) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/0xf709CBf25c18a40f6f860933EF48cae78bE48696/initialise`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "AMOY",
            blockchain: "POLY",
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
        `${baseURL}/invoke/0xf709CBf25c18a40f6f860933EF48cae78bE48696/mint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "AMOY",
            blockchain: "POLY",
            walletAddress: fixedWallet,
            args: {
              to: recipientAddress,
              description : "string",
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

  // const querySBT = async (owner: string, tokenId: string) => {
  //   try {
  //     const response = await fetch(
  //       `${baseURL}/query/4YmhL1C3IODKvk0UY7WBpHXKPr8GixYo1735807277656/QuerySBT`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
  //         },
  //         body: JSON.stringify({
  //           network: "AMOY",
  //           blockchain: "POLY",
  //           walletAddress: fixedWallet,
  //           args: {
  //             owner,
  //             tokenID: tokenId,
  //           },
  //         }),
  //       }
  //     );
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error querying SBT:", error);
  //   }
  // };

  const getSBTByOwner = async (owner: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/0xf709CBf25c18a40f6f860933EF48cae78bE48696/getTokenByOwner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "AMOY",
            blockchain: "POLY",
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

  // const getAllTokenIDs = async () => {
  //   try {
  //     const response = await fetch(
  //       `${baseURL}/query/4YmhL1C3IODKvk0UY7WBpHXKPr8GixYo1735807277656/GetAllTokenIDs`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
  //         },
  //         body: JSON.stringify({
  //           network: "AMOY",
  //           blockchain: "POLY",
  //           walletAddress: fixedWallet,
  //         }),
  //       }
  //     );
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error getting all token IDs:", error);
  //   }
  // };

  const attemptTransfer = async (from: string, to: string, tokenId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/kalp/query/4YmhL1C3IODKvk0UY7WBpHXKPr8GixYo1735807277656/TransferSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "AMOY",
            blockchain: "POLY",
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
    getSBTByOwner,
    attemptTransfer,
  };
};

export default useEVMSBTApi;
