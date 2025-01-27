import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NotchedButtonLink } from './Link';

const Footer = ({ active }) => {
  return (
    <footer
      className={`footer mx-8 mb-8 grid grid-cols-3 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 gap-1 notched notched--border ${
        active ? `active` : ``
      }`}
    >
      <div className="footer-col lg:col-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3">
        <div className="footer-img flex flex-col justify-between h-full">
          <NotchedButtonLink text="Become a Member" location="/membership" />
          <NotchedButtonLink
            external
            text="Donate"
            location="https://secure.lglforms.com/form_engine/s/SpkKq95XVPOuQ2d-UNFtXQ"
          />
          <div className="footer__logo-wrapper flex lg:justify-start md:justify-start sm:justify-center xs:justify-center sm:my-20 md:mt-20">
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

      <div className="footer-form footer-col lg:col-span-1 lg:col-start-3 md:col-span-1 md:col-start-3 sm:col-start-1 sm:col-span-3 xs:col-span-3">
        <form className="flex flex-col">
          <label htmlFor="signup-input" className="signup-label">
            Subscribe for OSHWA Updates
          </label>
          <fieldset className="signup-submit-wrapper notched notched--border my-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="signup-input"
              id="signup-input"
            />
          </fieldset>
          <fieldset className="signup-submit-wrapper notched notched--border w-1/2">
            <input type="submit" className="signup-submit" />
          </fieldset>
        </form>

        <div className="socials mt-4 md:mt-10 sm:mt-10">
          <a
            href="https://twitter.com/oshwassociation"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://bsky.app/profile/oshwassociation.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            <i className="fab fa-bluesky ml-4"></i>
          </a>
          <a
            href="https://mastodon.social/@oshwassociation"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mastodon"
          >
            <i className="fab fa-mastodon ml-4"></i>
          </a>
          <a
            href="https://linkedin.com/in/open-source-hardware-association"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin ml-4"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
