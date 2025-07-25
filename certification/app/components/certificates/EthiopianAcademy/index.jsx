import React, { useState, useEffect } from "react";
import "../certificate.css";
import styles from "./Certificate.module.css";
import Image from "next/image";
import ESAlogo from "../../../../public/EAS-logo.png";

const EthiopianAcademy = ({
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
        <img src="/kalp-academy-white.svg" alt="logo" width={150} />
      </div>
      <div className={styles.easLogo}>
        <Image src={ESAlogo} alt="logo" width={180} height={180} />
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
          has actively participated in the a half-day workshop on{" "}
          <strong>&ldquo;Introduction to Blockchain&rdquo;</strong> held on 27th
          June 2025, organized by the Kalp Academy in association with The
          Ethiopian Academy of Sciences. The session provided participants with
          a foundational understanding of blockchain technology and its
          applications, including Web3 concepts and an overview of
          cryptocurrency ecosystems.
        </p>

        <div className={styles.infoWithQr}>
          <div className={styles.infoLines}>
            <p className={styles.infoLine}>
              <strong>Issue Date:</strong>{" "}
              <span className={styles.issueDate}>{formatDate(date)}</span>
            </p>
            <p className={styles.infoLinetwo}>
              <strong className={styles.certificateId}>Certificate ID:</strong>{" "}
              <span className={styles.certificateId}>
                {" "}
                0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
              </span>
            </p>
          </div>
          <div className={styles.qrCode}>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                width: "140px",
                height: "140px",
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
            <p>Mrityunjaya Prajapati</p>
            <small>Chief Executive Officer </small>
            <small>Kalp Digital Infra Pvt. Ltd.</small>
          </div>

          <div
            className={`${styles.signatureBlock} ${styles.uthiraSignatureBlock}`}
          >
            <p>Prof. Teketel Yohannas</p>
            <small>Executive Director</small>
            <small>Ethiopian Academy of Sciences</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthiopianAcademy;
