import React from "react";


function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">

          <div className="footer-logo">
            <img
              src="staynestlogo.png"
              alt="StayNest Logo"
              className="footer-logo-image"
            />

            <span>StayNest</span>
          </div>

          <p>
            Your smart travel companion for discovering amazing destinations,
            finding the perfect stay, and planning unforgettable journeys.
          </p>

          <div className="footer-socials">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>

        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>
          <a href="#destinations">Destinations</a>
          <a href="#stays">Stays</a>
          <a href="#deals">Travel Deals</a>
          <a href="#popular">Popular Places</a>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>Company</h3>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#careers">Careers</a>
          <a href="#faq">FAQs</a>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <a href="#help">Help Center</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#security">Security</a>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2026 StayNest. All rights reserved.</p>
        <p>Made with ❤️ for travelers</p>
      </div>

    </footer>
  );
}

export default Footer;