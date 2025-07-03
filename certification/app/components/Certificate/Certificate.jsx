import React, { useState, useEffect } from "react";
import "./Certificate.css"; // move your styles to this file or use styled-components

const Certificate = ({
  name = "Mr. [Participant's Full name]",
  date = "",
  photo,
  hash,
}) => {
  const [profileImage, setProfileImage] = useState(
    photo || "/images/profile.png"
  );
  const [qrImage, setQrImage] = useState("/images/qr-code.png");
  const [isLoading, setIsLoading] = useState(false);

  // Function to format date from timestamp to readable format
  const formatDate = (dateString) => {
    try {
      // If it's already in the desired format, return as is
      if (
        dateString &&
        !dateString.includes("T") &&
        !dateString.includes("-")
      ) {
        return dateString;
      }

      // Convert timestamp to readable date
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) {
        return ""; // fallback
      }

      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return dateObj.toLocaleDateString("en-GB", options);
    } catch {
      return ""; // fallback
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      // Only fetch if we have a wallet address (hash) and haven't already received a photo prop
      if (hash && !photo) {
        setIsLoading(true);
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
              setProfileImage(data.links.profile);
              setQrImage(data.links.qr);
            } else {
              // If response doesn't have expected structure, fall back to defaults
              console.warn(
                "API response does not contain expected profile/qr links"
              );
              setProfileImage("/images/profile.png");
              setQrImage("/images/qr-code.png");
            }
          } else {
            // If API call fails, fall back to defaults
            console.warn("Failed to fetch images from API, using defaults");
            setProfileImage("/images/profile.png");
            setQrImage("/images/qr-code.png");
          }
        } catch (error) {
          // If there's an error, fall back to defaults
          console.warn("Error fetching images from API:", error);
          setProfileImage("/images/profile.png");
          setQrImage("/images/qr-code.png");
        } finally {
          setIsLoading(false);
        }
      } else if (photo) {
        // If photo prop is provided, use it
        setProfileImage(photo);
      }
    };

    fetchImages();
  }, [hash, photo]);

  return (
    <div className="certificate-container">
      <div className="left-panel"></div>

      <div className="right-panel">
        {isLoading ? (
          <div className="loading-placeholder">
            <div className="loading-spinner">Loading...</div>
          </div>
        ) : (
          <img
            src={profileImage}
            alt="Logo"
            className="top-right-image"
            onError={(e) => {
              // If the fetched image fails to load, fall back to default
              e.target.src = "Participant_image.png";
            }}
          />
        )}
        <div className="certificate-title">
          <h1>Certificate</h1>
          <h2>of Completion</h2>
        </div>

        <p className="intro-text">This is to certify that</p>

        <span className="participant-name">{name}</span>

        <p className="certificate-body">
          has successfully completed the Blockchain Online Certification
          Program, gaining essential knowledge in Blockchain Basics,
          Cryptocurrency Types, Indian Laws, and Global Blockchain Trends.
        </p>

        <div className="cert-metadata">
          <div className="metadata-container">
            <div className="text-metadata">
              <p>
                <span className="issued-date-label">Issued on:</span>{" "}
                <span className="issued-date-value">{formatDate(date)}</span>
              </p>
              <p>
                <span className="certificate-id-label">Certificate ID:</span>{" "}
                <span className="certificate-id-value">{hash}</span>
              </p>
            </div>
            <div className="qr-code">
              <img
                src={qrImage}
                alt="QR Code"
                onError={(e) => {
                  // If the fetched QR image fails to load, fall back to default
                  e.target.src = "/images/qr-code.png";
                }}
              />
            </div>
          </div>
        </div>

        <div className="signatures">
          <div className="signature-block">
            <img src="lalith_signature.png" alt="Lalith Krishnan H Signature" />
            <p>Lalith Krishnan H</p>
            <small>Director Digital South Trust</small>
          </div>
          <div className="signature-block">
            <img src="sahana_signature.png" alt="Shahana Prakasam Signature" />
            <p>Shahana Prakasam</p>
            <small>Intellectual Property</small>
          </div>
          <div className="signature-block">
            <img src="kajol_signature.png" alt="Kajol Golchha Signature" />
            <p>Kajol Golchha</p>
            <small>Certified Trainer</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
