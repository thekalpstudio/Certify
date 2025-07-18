"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CertificateDigitalSouth from "../../../components/certificates/CertificateDigitalSouth/Certificate";
import useSBTApi from "../../../../hooks/userSBT";
import useEVMSBTApi from "@/hooks/useEVMSBT";
import usePDFDownload from "../../../../hooks/usePDFDownload";
import CertificateDigitalSouthWithHindustanCollege from "../../../components/certificates/CertificateDigitalSouthWithHindustanCollege";

export default function OwnershipChecker() {
  const params = useParams();
  const [links, setLinks] = useState(null);
  const [ownership, setOwnership] = useState(null);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [networkType, setNetworkType] = useState(null);

  const { getSBTByOwner, isReady } = useSBTApi(networkType);
  const { getSBTByOwner: getEVMSBTByOwner } = useEVMSBTApi();
  const { downloadPDF } = usePDFDownload();

  const getOrgId = () => {
    const splitURL = links?.qr?.split("/");
    return splitURL?.length ? splitURL[splitURL.length - 2] : null;
  };

  const handleCheck = async (network, owner) => {
    setOwnership(null);

    try {
      let response;
      if (network === "Holesky") {
        response = await getEVMSBTByOwner(owner);
      } else {
        // Contract should already be ready at this point
        response = await getSBTByOwner(owner);
      }
      if (response.result.success) {
        // Parse the metadata string into an object
        let parsedMetadata = {};
        try {
          if (network === "Holesky") {
            parsedMetadata = {
              name: response.result.result[2][1],
              dateOfIssue: response.result.result[2][3],
            };
          } else {
            parsedMetadata = JSON.parse(response.result.result.metadata);
          }
        } catch (parseError) {
          setError("Failed to parse metadata.", parseError);
          return;
        }

        setOwnership({
          owner: response.result.result.owner,
          tokenID: response.result.result[1],
          metadata: parsedMetadata,
          timestamp: response.timestamp,
        });
      } else {
        setError("No certificate found for this owner.");
      }
    } catch (err) {
      setError("An error occurred while checking ownership.", err);
    }
  };

  const fetchLinks = async (hash) => {
    try {
      const certiqoBEURL =
        process.env.NEXT_PUBLIC_CERTIFO_BE_URL || "https://api.certiqo.com";
      const response = await fetch(
        `${certiqoBEURL}/api/v1/token/${hash}/links`
      );

      if (response.ok) {
        const data = await response.json();

        // Check if the response has the expected structure
        if (data.links && data.links.profile && data.links.qr) {
          setLinks(data.links);

          // Determine network type based on organization ID from the fetched links
          const splitURL = data.links.qr.split("/");
          const orgId = splitURL?.length ? splitURL[splitURL.length - 2] : null;
          const determinedNetworkType =
            orgId === "39533d21-d5d7-4977-bf8e-2b0f99a19465"
              ? "TESTNET"
              : "MAINNET";

          console.log(
            `Organization ID: ${orgId}, Using network: ${determinedNetworkType}`
          );
          setNetworkType(determinedNetworkType);

          return { links: data.links, networkType: determinedNetworkType };
        } else {
          // If response doesn't have expected structure, fall back to defaults
          setLinks(null);
          return { links: null, networkType: "TESTNET" };
        }
      }

      return { links: null, networkType: "TESTNET" };
    } catch (error) {
      console.error("Failed to fetch links:", error);
      return { links: null, networkType: "TESTNET" };
    }
  };

  useEffect(() => {
    const address = params.address;

    const initializeAndCheck = async () => {
      const { links: fetchedLinks, networkType: fetchedNetworkType } =
        await fetchLinks(address);

      if (fetchedLinks) {
        // Wait for the hook to be ready with the correct network type
        // The useEffect will re-run when networkType changes and isReady becomes true
        setNetworkType(fetchedNetworkType);
      }
    };

    initializeAndCheck().catch((error) => {
      console.error("Failed to initialize:", error);
    });
  }, []); // Only run once on mount

  // Separate useEffect to handle certificate check when contract is ready
  useEffect(() => {
    if (isReady && links && networkType) {
      const address = params.address;
      handleCheck(params.network, address);
    }
  }, [isReady, links, networkType]); // Run when contract is ready and we have links

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const filename = `certificate-${
        ownership.metadata.name?.replace(/\s+/g, "-") || "download"
      }.pdf`;
      await downloadPDF("certificate-container", filename);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!ownership || !links || !isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isReady ? "Initializing contract..." : "Loading certificate..."}
          </p>
        </div>
      </div>
    );
  }

  const CertificateComponent =
    getOrgId() === "39533d21-d5d7-4977-bf8e-2b0f99a19465"
      ? CertificateDigitalSouth
      : CertificateDigitalSouthWithHindustanCollege;

  return (
    <div>
      <main className="flex flex-col gap-8 justify-center min-h-screen bg-gradient-to-br items-center from-gray-50 to-indigo-50">
        {/* Download Button */}
        {/* Certificate Container */}
        {ownership && (
          <div id="certificate-container">
            <CertificateComponent
              title="College Degree"
              name={ownership.metadata.name || "Your Name"}
              date={ownership.metadata.dateOfIssue || "Date"}
              hash={params.address || "Recipient Address"}
              college={ownership.owner || "IIT"}
              links={links}
            />
          </div>
        )}
        {ownership && (
          <div className="flex justify-center">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Certificate
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </main>
    </div>
  );
}
