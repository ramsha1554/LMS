import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

function Footer() {
  return (
    <div className="w-full bg-black text-neutral-400 py-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
              SS
            </div>
            <span className="text-sm font-bold text-white tracking-wider">
              SKILL SYNC
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Learn modern skills with industry-ready courses and expert mentorship.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2.5 text-xs text-neutral-500">
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Home
            </span>
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Courses
            </span>
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              About
            </span>
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Contact
            </span>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Support
          </h4>
          <div className="flex flex-col gap-2.5 text-xs text-neutral-500">
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Help Center
            </span>
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white transition-colors duration-200">
              Terms & Conditions
            </span>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Follow Us
          </h4>
          <div className="flex gap-4 items-center">
          <a
  href="https://github.com/ramsha1554"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors duration-200"
>
  <Github className="w-4 h-4" />
</a>

<a
  href="https://www.linkedin.com/in/syeda-ramsha-anjum1554/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors duration-200"
>
  <Linkedin className="w-4 h-4" />
</a>

<a
  href="https://instagram.com/_ramshaa.13"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors duration-200"
>
  <Instagram className="w-4 h-4" />
</a>
             
            
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-900 mt-12 pt-6 text-center text-xs text-neutral-600">
        © 2026 SKILL SYNC. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;

