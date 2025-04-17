import React from 'react';
import './index.scss';
import { FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';

export default function PreHeader() {
  
  const WppClick = () => {
    window.open('https://api.whatsapp.com/send?phone=5511991776312');
  };

  const instagramClick = () => {
    window.open('https://www.instagram.com/irinhadias');
  };

  const emailClick = () => {
    window.location.href = 'mailto:seuemail@gmail.com';
  };

  const facebookClick = () => {
    window.open('https://www.facebook.com/seufacebook');
  };

  return (
    <div className="pre-header">
      <div className="left-side">
        <div className="info" onClick={WppClick}>
          <FaWhatsapp className="icon" />
          <span>(11)99177-6312</span>
        </div>
        
        <div className="info" onClick={emailClick}>
          <FaEnvelope className="icon" />
          <span>irinhadiass@gmail.com</span>
        </div>
      </div>

      <div className="right-side">
        <div className="social" onClick={facebookClick}>
          <FaFacebook className="icon" />
        </div>
        <div className="social" onClick={instagramClick}>
          <FaInstagram className="icon" />
        </div>
      </div>
    </div>
  );
}
