import React, { useState, useEffect } from "react";
import "../certificate.css";
import styles from "./Certificate.module.css";

const CertificateDigitalSouthWithHindustanCollege = ({
  name = "Mr. Parambir Singh",
  date = "04 July 2025",
  photo,
  hash,
  links,
}) => {
  const [, setProfileImage] = useState(photo || "/images/profile.png");
  const [qrImage, setQrImage] = useState("/templates/template2/qrcode.png");
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
        return date; // fallback to prop
      }

      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return dateObj.toLocaleDateString("en-GB", options);
    } catch {
      return date; // fallback to prop
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.certificateWrapper}>
      <div className={styles.certificateHeader}>
        <img src="/KS_Logo_white.png" alt="logo" width={150} />
      </div>
      <div className={styles.textArea}>
        <h1 className={styles.certificateTitle}>
          Certificate
          <br />
          <span>of Participation</span>
        </h1>

        <p className={styles.introText}>This is to certify that</p>

        <div className={styles.participantName}>{name}</div>

        <p className={styles.certificateBody}>
          has actively participated in the Guest Lecture on{" "}
          <strong>
            &ldquo;Web3 for Everyone: Exploring Opportunities Beyond Tech&rdquo;
          </strong>
          , organized by the Department of Commerce (General) Shift I, Hindustan
          College of Arts & Science in association with Digital South Trust. The
          session focused on emerging trends in Web3, blockchain, and
          cryptocurrency in future finance.
        </p>

        <div className={styles.infoWithQr}>
          <div className={styles.infoLines}>
            <p className={styles.infoLine}>
              <strong>Issue Date:</strong>{" "}
              <span className={styles.issueDate}>{formatDate(date)}</span>
            </p>
            <p className={styles.infoLine}>
              <strong>Certificate ID:</strong>{" "}
              <span className={styles.certificateId}>{hash}</span>
            </p>
          </div>
          <div className={styles.qrCode}>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                width: "80px",
                height: "80px",
              }}
              onError={(e) => {
                // If the fetched QR image fails to load, fall back to default
                e.target.src = "/images/qr-code.png";
              }}
            />
          </div>
        </div>

        <div className={styles.signatures}>
          <div className={styles.signatureBlock}>
            <img
              src="/templates/template2/lalith_signature.png"
              alt="Signature of Lalith Krishnan H"
              className={styles.signature}
              onError={(e) => {
                e.target.src = "/lalith_signature.png";
              }}
            />
            <p>Lalith Krishnan H</p>
            <small>Director – Digital South Trust</small>
          </div>

          <div
            className={`${styles.signatureBlock} ${styles.uthiraSignatureBlock}`}
          >
            <img
              src="/templates/template2/uthira_signature.png.jpg"
              alt="Signature of Dr. Uthira D"
              className={styles.signature}
              onError={(e) => {
                e.target.src = "/sahana_signature.png";
              }}
            />
            <p>Dr. Uthira D</p>
            <small>Principal – HCAS</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDigitalSouthWithHindustanCollege;
