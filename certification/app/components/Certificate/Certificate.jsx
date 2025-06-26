import React, { useState, useEffect } from "react";
import "./Certificate.css"; // move your styles to this file or use styled-components

const Certificate = ({ name = "Mr. [Participant's Full name]", date = "23 January, 2024", photo, hash }) => {
  const [profileImage, setProfileImage] = useState(photo || "/images/profile.png");
  const [qrImage, setQrImage] = useState("/images/qr-code.png");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      // Only fetch if we have a wallet address (hash) and haven't already received a photo prop
      if (hash && !photo) {
        setIsLoading(true);
        try {
          const certiqoBEURL = process.env.NEXT_PUBLIC_CERTIFO_BE_URL || 'https://api.certiqo.com';
          const response = await fetch(`${certiqoBEURL}/token/${hash}/links`);
          
          if (response.ok) {
            const data = await response.json();
            
            // Check if the response has the expected structure
            if (data.links && data.links.profile && data.links.qr) {
              setProfileImage(data.links.profile);
              setQrImage(data.links.qr);
            } else {
              // If response doesn't have expected structure, fall back to defaults
              console.warn('API response does not contain expected profile/qr links');
              setProfileImage("/images/profile.png");
              setQrImage("/images/qr-code.png");
            }
          } else {
            // If API call fails, fall back to defaults
            console.warn('Failed to fetch images from API, using defaults');
            setProfileImage("/images/profile.png");
            setQrImage("/images/qr-code.png");
          }
        } catch (error) {
          // If there's an error, fall back to defaults
          console.warn('Error fetching images from API:', error);
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
            {isLoading ? (
              <div className="user-photo loading-placeholder">
                <div className="loading-spinner">Loading...</div>
              </div>
            ) : (
              <img 
                src={profileImage} 
                alt="Participant" 
                className="user-photo"
                onError={(e) => {
                  // If the fetched image fails to load, fall back to default
                  e.target.src = "/images/profile.png";
                }}
              />
            )}
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
            <img 
              src={qrImage} 
              alt="QR Code" 
              className="qr-code"
              onError={(e) => {
                // If the fetched QR image fails to load, fall back to default
                e.target.src = "/images/qr-code.png";
              }}
            />
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
 