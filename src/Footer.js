// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo">
          <img src="path_to_your_logo" alt="Company Logo" />
        </div>
        <div className="contact-info">
          <p>CONTACT</p>
          <p>Westpark Towers, 7th Floor, Rm706 Mpesi Lane, Westlands.</p>
          <p>Info@tangenthomesltd.com</p>
          <p>0713 222225 / 0713938985</p>
        </div>
      </div>
      <div className="footer-right">
        <ul className="social-media">
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
