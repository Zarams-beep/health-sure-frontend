"use client";
import { useState } from "react";
import { z } from "zod";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube } from "react-icons/ti";
import { SlSocialGoogle, SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";
import { IoLogoWhatsapp } from "react-icons/io";

// Zod Schema for Email Validation
const emailSchema = z.string().email("Please enter a valid email address.");

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    const validation = emailSchema.safeParse(email);
    
    if (!validation.success) {
      setError(validation.error.issues[0].message);
    } else {
      setError("");
      alert("Subscribed successfully!");
      setEmail(""); 
    }
  };

  return (
    <>
      <footer className="landing-footer">
        <div className="landing-footer-section">
          {/* Input section */}
          <div className="input-div-footer">
          <section className="input-footer-section">
         
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </section>
          {error && <p className="error-message">{error}</p>}
          </div>

          {/* Footer Section */}
          <section className="footer-list">
            {/* About Us */}
            <div className="sub-list">
              <h3>About Us</h3>
              <ul>
                <li>Our Services</li>
                <li>Why Choose Us</li>
                <li>Consult a Doctor</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="sub-list">
              <h3>Quick Links</h3>
              <ul>
                <li>Help Center</li>
                <li>Health Insights</li>
                <li>Locate a Hospital</li>
              </ul>
            </div>

            {/* Get Involved */}
            <div className="sub-list">
              <h3>Get Involved</h3>
              <ul>
                <li>Join Our Team</li>
                <li>Pharmacy Assistance</li>
                <li>Partner With Us</li>
              </ul>
            </div>

            {/* Policies */}
            <div className="sub-list">
              <h3>Policies</h3>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Regulatory Compliance</li>
              </ul>
            </div>
          </section>

          {/* Line */}
          <hr />

          {/* Socials */}
          <div className="social-icons">
            <div className="">
            <TiSocialFacebook className="footer-icon"/>
            <TiSocialLinkedin className="footer-icon"/>
            <SlSocialGoogle className="footer-icon"/>
            <SlSocialInstagram className="footer-icon"/>
            <TiSocialYoutube className="footer-icon"/>
            <SlSocialTwitter className="footer-icon"/>
            <IoLogoWhatsapp className="footer-icon"/>
            </div>
        

          {/* Copyright */}
          <div className="copyright">
            <p>Copyright &#169; 2025, Health Sure. All rights reserved</p>
          </div>  </div>
        </div>
      </footer>
    </>
  );
}
