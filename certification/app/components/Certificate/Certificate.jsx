import React from "react";
import "./Certificate.css"; // move your styles to this file or use styled-components

const Certificate = ({ name = "Mr. [Participant’s Full name]", date = "23 January, 2024", photo }) => {
  return (
    <div className="certificate-container">
      <div className="certificate-wrapper">
        <aside className="left-panel">
          <div className="header">
            <img src="/images/left-header.png" alt="Kalp Studio logo" className="kalp-studio-logo" />
            <div className="trust-text">India's Leading Blockchain
education trust</div>
            <div className="date">{date}</div>
          </div>
          <img src="/images/left-bg.png" alt="Background net" className="blue-net-image" />
        </aside>

        <section className="right-panel">
          <div className="photo-container">
            <img src={photo || "/images/profile.png"} alt="Participant" className="user-photo" />
          </div>

          <div className="header-text">
            <span className="title-main">Certificate</span>
            <span className="title-sub">of Completion</span>
          </div>
          <span className="certify-text">This is to certify that</span>
          <span className="participant-name">{name}</span>
          <span className="body-text">
            has successfully completed the blockchain Online Certification Program,
            gaining knowledge in Blockchain Basics, Cryptocurrency Types, Indian
            Laws, and Global Blockchain Trends.
          </span>

          <div className="qr-code-container">
            <img src="/images/qr-code.png" alt="QR Code" className="qr-code" />
          </div>

          <div className="signatures">
            <div className="signature-block">
              <img src="/images/sign1.png" alt="Signature 1" className="signature-image" />
              <div className="signer-name">Lalith Krishnan H</div>
              <div className="signer-title">Director - Digital South Trust</div>
            </div>
            <div className="signature-block">
              <img src="/images/sign2.png" alt="Signature 2" className="signature-image" />
              <div className="signer-name">Shahana Prakasam</div>
              <div className="signer-title">Technology Lawyer</div>
            </div>
            <div className="signature-block">
              <img src="/images/sign3.png" alt="Signature 3" className="signature-image" />
              <div className="signer-name">Kajol Golchha</div>
              <div className="signer-title">Certified Trainer</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Certificate;
 