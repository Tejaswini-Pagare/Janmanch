import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ContactUs from "../../screens/ContactUs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      
      <div className="container mx-auto px-6 lg:px-20">
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-between">
              <img src="src/images/janmanch_logo.png" alt="Janmanch Logo" className="h-12 mb-3" />
              <p className="text-3xl font-bold">Janmanch</p>
            </div>
            {/* <img src="src/images/janmanch_logo.png" alt="Janmanch Logo" className="h-12 mb-3" /> */}
            
            <p className="text-gray-400 text-sm text-center md:text-left">
              Empowering communities with transparency & communication.
            </p>
            <div className="mt-10">
            <ContactUs/>

            </div>
            
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="/community" className="hover:text-orange-400 transition">Community</a></li>
              <li><a href="/citizen-voice" className="hover:text-orange-400 transition">Citizen's Voice</a></li>
              <li><a href="/ward-details" className="hover:text-orange-400 transition">Ward Details</a></li>
              <li><a href="/corporator-details" className="hover:text-orange-400 transition">Corporator Details</a></li>
              {/* <li><a href="/contact" className="hover:text-orange-400 transition">Contact</a></li> */}
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            
            <p className="text-gray-400 text-sm">Email: janmanch.web@gmail.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>

            {/* Social Media Links */}
            {/* <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-blue-500 text-lg"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-lg"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-pink-500 text-lg"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 text-lg"><FaLinkedinIn /></a>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Janmanch. All Rights Reserved.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
