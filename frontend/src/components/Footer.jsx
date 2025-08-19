import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          
          {/* Brand Info */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-[#CF0F47]">Match Hire</h2>
            <p className="text-sm text-gray-400">
              © 2024 Match Hire. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616 3c-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124C7.728 8.816 4.1 6.865 1.671 3.905a4.903 4.903 0 00-.666 2.475c0 1.708.869 3.216 2.188 4.099a4.904 4.904 0 01-2.229-.616v.06c0 2.385 1.697 4.374 3.946 4.827a4.935 4.935 0 01-2.224.085c.626 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.945 13.945 0 007.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.326-.026-3.033-1.849-3.033-1.851 0-2.134 1.446-2.134 2.939v5.663H9.268V9h3.451v1.561h.05c.481-.911 1.654-1.872 3.403-1.872 3.639 0 4.312 2.395 4.312 5.509v6.254zM5.337 7.433c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zM6.818 20.452H3.855V9h2.963v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
