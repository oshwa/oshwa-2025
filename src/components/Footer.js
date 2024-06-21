import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { NotchedButtonLink } from './Link';

const Footer = () => {
  return (
    <footer className="footer p-10 pt-0 mb-5 mx-10 grid grid-cols-3 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 gap-1 notched notched--border">
      <div className="footer-col py-4 lg:col-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3">
        <div className="footer-img flex flex-col justify-between h-full">
          <NotchedButtonLink text="Become a Member" location="/" />
          <div className="footer__logo-wrapper flex lg:justify-start md:justify-start sm:justify-center xs:justify-center my-8">
            <StaticImage
              className="footer__logo image-theme--dark"
              src="../images/lockup-white.svg"
              alt="Oshwa Logo"
              placeholder="none"
            />
            <StaticImage
              className="footer__logo image-theme--light"
              src="../images/lockup-black.svg"
              alt="Oshwa Logo"
              placeholder="none"
            />
          </div>
        </div>
      </div>

      <div className="footer-form footer-col py-4 lg:col-span-1 lg:col-start-3 md:col-span-1 md:col-start-3 sm:col-start-1 sm:col-span-3 xs:col-span-3">
        <form className="flex flex-col">
          <label className="signup-label">Subscribe for OSHWA Updates</label>
          <fieldset className="signup-submit-wrapper notched notched--border my-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="signup-input"
            />
          </fieldset>
          <fieldset className="signup-submit-wrapper notched notched--border w-1/2">
            <input type="submit" className="signup-submit" />
          </fieldset>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
