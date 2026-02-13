import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-gray-500 text-sm bg-transparent border-t border-white/5 mt-auto">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Nexus AI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
