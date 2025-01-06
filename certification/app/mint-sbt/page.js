"use client";
import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import Certificate from "../components/Certificate/Certificate";
import { Wallet, Lock } from "lucide-react";
import useSBTApi from "@/hooks/userSBT";
import useEVMSBTApi from "@/hooks/useEVMSBT";
import Link from "next/link";

const MintSbt = () => {
  const { mintSBT } = useSBTApi();
  const { mintSBT: mintEVMSBT } = useEVMSBTApi();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [organization, setOrganization] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: "", message: "", hash: "" });
  const [network, setNetwork] = useState("Holesky");

  const FIXED_WALLET =
    network === "Holesky"
      ? process.env.NEXT_PUBLIC_HOLESKY_WALLET
      : process.env.NEXT_PUBLIC_KALP_WALLET;

  const ExplorerLink = network === "Holesky"
  ? "https://holesky.etherscan.io/tx/"
  : "https://kalpscan.io/transactions?transactionId="

  useEffect(() => {
    const savedNetwork = localStorage.getItem("selectedNetwork");
    if (savedNetwork) {
      setNetwork(savedNetwork);
    }
  }, []);

  const handleMint = async () => {
    if (!recipientAddress || !userName || !organization || !dateOfIssue) {
      setResult({
        status: "error",
        message: "All fields are required. Please fill in the form completely.",
        hash: "",
      });
      return;
    }

    setLoading(true);
    setResult({ status: "", message: "", hash: "" });
    let response;

    try {
      if (network === "Holesky") {
        response = await mintEVMSBT(
          recipientAddress,
          userName,
          organization,
          dateOfIssue
        );

        if (response.status == "FAILURE") {
          throw new Error("Failed to mint certification.");
        }
      } else {
        response = await mintSBT(
          recipientAddress,
          userName,
          organization,
          dateOfIssue
        );

        if (response.status == "FAILURE") {
          throw new Error("Failed to mint certification.");
        }
      }

      setResult({
        status: "success",
        message:
          "Certification SBT minted successfully! Your achievement is now permanently recorded on the blockchain.",
        hash: network === "Holesky" ? response.result.result.transactionHash : response.result.transactionId,
      });
      setRecipientAddress("");
      setUserName("");
      setOrganization("");
      setDateOfIssue("");
    } catch (error) {
      console.error("Mint error:", error);
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        hash: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar2 />
      <div className="flex gap-8 h-[100vh] bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-4">
        <div className="w-1/3 ml-16">
          <div className="bg-white rounded-2xl shadow-xl py-4 px-8">
            {/* User Name Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-black">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Enter user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* User Email Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-black">
                User Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Enter user email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Organization Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-black">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Kalp Studio"
                value={organization}
                onChange={() => setOrganization("Kalp Studio")}
              />
            </div>

            {/* Date of Issue Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-black">
                Date of Issue <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                value={dateOfIssue}
                onChange={(e) => setDateOfIssue(e.target.value)}
              />
            </div>

            {/* Recipient Address Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-black">
                Student s Wallet Address (Recipent){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  placeholder="Enter recipient s wallet address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>
              <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-700">
                    Wallet Address (Issuer)
                  </h3>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code className="text-sm text-gray-600 break-all">
                    {FIXED_WALLET}
                  </code>
                </div>
              </div>
            </div>

            {/* Mint Button */}
            <button
              onClick={handleMint}
              disabled={
                !recipientAddress ||
                !userName ||
                !organization ||
                !dateOfIssue ||
                loading
              }
              className={`mt-8 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium ${
                !recipientAddress ||
                !userName ||
                !organization ||
                !dateOfIssue ||
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Minting Certificate...</span>
                </div>
              ) : (
                <span>Issue Certification</span>
              )}
            </button>

            {/* Result Alert */}
            {result.status && (
              <div className="mt-6">
                <p
                  className={`${
                    result.status === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result.message}
                  {result.hash && <>
                    <span className="text-black">Link to verify:</span><Link href={`${ExplorerLink}${result.hash}`} target="_blank"><span className="text-blue-600">Click here</span></Link>
                  </>}
                  
                </p>
              </div>
            )}
          </div>
        </div>

        <Certificate
          title="College Degree"
          name={userName || "Your Name"}
          date={dateOfIssue || "Date"}
          hash={recipientAddress || "Recipient Address"}
          college={organization || "IEM"}
        />
      </div>
    </div>
  );
};

export default MintSbt;
