import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 py-0 mb-0 bg-orange-100 md:p-4 lg:p-3 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="src/images/janmanch_logo.png"
            alt="Janmanch Logo"
            className="mr-1 h-10"
          />
          Janmanch
        </a>
        
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Janmanch
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
