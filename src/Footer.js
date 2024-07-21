import React from 'react';
import tangentLogo from './Tangent logo.jpg'; // Ensure correct file path and extension
import './Footer.css'; // Make sure to create and import this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="https://tangenthomesltd.com/">
            <img src={tangentLogo} alt="Tangent Homes Ltd Logo" className="logo-img responsive-logo" />
          </a>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
    
            <p>Westpark Towers, 7th Floor, <br/>Rm706 Mpesi Lane, Westlands.</p>
            <p><a href="mailto:info@tangenthomesltd.com">info@tangenthomesltd.com</a></p>
            <p>0713 222225 / 0713938985</p>
          </div>
          <div className="footer-column">
            <ul>
              <br/>
              <br/>
              <li><a href="https://tangenthomesltd.com/overview/">About Us</a></li>
              <li><a href="https://tangenthomesltd.com/contact-us/#">Support Center</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-social">
        <a href="https://www.facebook.com/TangentHomes" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com/tangenthomes/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://x.com/HomesTangent" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.linkedin.com/in/tangent-homes-b07a98231/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;