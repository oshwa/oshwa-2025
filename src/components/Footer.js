import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NotchedButtonLink } from './Link';
import MailchimpForm from './MailchimpForm';

const Footer = ({ active }) => {
  return (
    <footer
      className={`footer mx-8 mb-8 grid grid-cols-3 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 gap-1 notched notched--border ${active ? `active` : ``
        }`}
    >
      <div className="footer-col lg:col-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3">
        <div className="footer-img">
          <NotchedButtonLink text="Become a Member" location="/membership" />
          <NotchedButtonLink
            external
            text="Donate"
            location="https://secure.lglforms.com/form_engine/s/SpkKq95XVPOuQ2d-UNFtXQ"
          />
          <div className="flex lg:absolute lg:bottom-8 lg:left-8 md:absolute md:bottom-8 md:left-8 sm:static xs:static sm:justify-center xs:justify-center sm:my-20 md:mt-20">
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
        <MailchimpForm />
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
          <a
            href="https://www.hackster.io/open-source-hardware-association/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hackster"
            className="fab ml-4"
          >
            <i class="hackster hackster--white image-theme--light"></i>
            <i class="hackster hackster--black image-theme--dark"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
