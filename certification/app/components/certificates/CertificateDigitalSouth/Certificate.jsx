import React, { useState, useEffect } from "react";
import "../certificate.css";
import styles from "./Certificate.module.css";

const CertificateDigitalSouth = ({
  name = "Mr. [Participant's Full name]",
  date = "",
  photo,
  hash,
  links,
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
    if (links) {
      setIsLoading(true);
      setProfileImage(links.profile);
      setQrImage(links.qr);
      setIsLoading(false);
    } else {
      setProfileImage("/images/profile.png");
      setQrImage("/images/qr-code.png");
    }
  }, [links]);

  return (
    <div className={styles.certificateContainer}>
      <div className={styles.leftPanel}></div>

      <div className={styles.rightPanel}>
        {isLoading ? (
          <div className={styles.loadingPlaceholder}>
            <div className={styles.loadingSpinner}>Loading...</div>
          </div>
        ) : (
          <img
            src={profileImage}
            alt="Logo"
            className={styles.topRightImage}
            onError={(e) => {
              // If the fetched image fails to load, fall back to default
              e.target.src = "Participant_image.png";
            }}
          />
        )}
        <div className={styles.certificateTitle}>
          <h1>Certificate</h1>
          <h2>of Completion</h2>
        </div>

        <p className={styles.introText}>This is to certify that</p>

        <span className={styles.participantName}>{name}</span>

        <p className={styles.certificateBody}>
          has successfully completed the Blockchain Online Certification
          Program, gaining essential knowledge in Blockchain Basics,
          Cryptocurrency Types, Indian Laws, and Global Blockchain Trends.
        </p>

        <div className={styles.certMetadata}>
          <div className={styles.metadataContainer}>
            <div className={styles.textMetadata}>
              <p>
                <span className="issued-date-label">Issued on:</span>{" "}
                <span className={styles.issuedDateValue}>
                  {formatDate(date)}
                </span>
              </p>
              <p>
                <span className="certificate-id-label">Certificate ID:</span>{" "}
                <span className={styles.certificateIdValue}>{hash}</span>
              </p>
            </div>
            <div className={styles.qrCode}>
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

        <div className={styles.signatures}>
          <div className={styles.signatureBlock}>
            <img
              src="/lalith_signature.png"
              alt="Lalith Krishnan H Signature"
            />
            <p>Lalith Krishnan H</p>
            <small>Director Digital South Trust</small>
          </div>
          <div className={styles.signatureBlock}>
            <img src="/sahana_signature.png" alt="Shahana Prakasam Signature" />
            <p>Shahana Prakasam</p>
            <small>Intellectual Property</small>
          </div>
          <div className={styles.signatureBlock}>
            <img src="/kajol_signature.png" alt="Kajol Golchha Signature" />
            <p>Kajol Golchha</p>
            <small>Certified Trainer</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDigitalSouth;
