"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Certificate from "../../../components/Certificate/Certificate";
import useSBTApi from "../../../../hooks/userSBT";
import useEVMSBTApi from "@/hooks/useEVMSBT";
import usePDFDownload from "../../../../hooks/usePDFDownload";

export default function OwnershipChecker() {
  const params = useParams();
  const { getSBTByOwner } = useSBTApi();
  const { getSBTByOwner: getEVMSBTByOwner } = useEVMSBTApi();
  const { downloadPDF } = usePDFDownload();
  const [ownership, setOwnership] = useState(null);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const network = params.network;
    const address = params.address;
    handleCheck(network, address);
  }, []);

  const handleCheck = async (network , owner) => {
    setOwnership(null);
    try {
      let response;
        if (network === "Holesky") {
          response = await getEVMSBTByOwner(owner);
        } else {
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

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const filename = `certificate-${ownership.metadata.name?.replace(/\s+/g, '-') || 'download'}.pdf`;
      await downloadPDF('certificate-container', filename);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <main className="flex flex-col gap-8 justify-center min-h-screen bg-gradient-to-br items-center from-gray-50 to-indigo-50">
        {/* Download Button */}
        {/* Certificate Container */}
        {ownership && (
          <div id="certificate-container">
            <Certificate
              title="College Degree"
              name={ownership.metadata.name || "Your Name"}
              date={ownership.metadata.dateOfIssue || "Date"}
              hash={ownership.tokenID || "Recipient Address"}
              college={ownership.owner || "IIT"}
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
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
