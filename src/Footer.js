import React from 'react';
import tangentLogo from './Tangent logo.jpg'; // Ensure correct file path and extension

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={tangentLogo} alt="Tangent Homes Ltd Logo" className="logo-img" />
      </div>
      <div className="footer-columns">
        <div className="footer-column">
          <h3>CONTACT</h3>
          <p>Westpark Towers, 7th Floor, Rm706 Mpesi Lane, Westlands.</p>
          <p>Info@tangenthomesltd.com</p>
          <p>0713 222225 / 0713938985</p>
        </div>
        <div className="footer-column">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>User Guide</li>
            <li>Support Center</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
