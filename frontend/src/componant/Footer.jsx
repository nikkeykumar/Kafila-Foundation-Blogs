import React from "react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#173626] text-white py-12">
      <div className="max-w-7xl mx-auto px-2">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Text */}
          <a href="/" className="flex items-center gap-3">
            <img src="/src/assets/logo-DvortFBw.png" className="h-12 w-12" />
            <div>
              <span className="text-2xl font-bold block">
                Kafila Foundation
              </span>
              <span className="text-lg opacity-70">
                Promising People For Better Tomorrow
              </span>
            </div>
          </a>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-white">
              <a href="#">
                <LuFacebook className="text-2xl hover:text-[#c47964]" />
              </a>
              <a href="#">
                <FaInstagram className="text-2xl hover:text-[#c47964]" />
              </a>
              <a href="#">
                <AiOutlineYoutube className="text-2xl hover:text-[#c47964]" />
              </a>
              <a href="#">
                <FaLinkedinIn className="text-2xl hover:text-[#c47964]" />
              </a>

              <a href="#">
                <FaXTwitter className="text-2xl hover:text-[#c47964]" />
              </a>
              <a href="#">
                <CiGlobe className="text-2xl hover:text-[#c47964]" />
              </a>
            </div>

            {/* Link */}
            <a href="/" className="text-lg hover:text-[#c47964]">
              Blog
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>© 2026 Kafila Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
