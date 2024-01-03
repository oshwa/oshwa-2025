import React from 'react';
import MarkdownText from './MarkdownText';

const FixedNav = ({ toc }) => {


  console.log(toc)

  
  return (
    <div className="fixed-nav">
      <a href="#" className="fixed-nav__dropdown">
        Table of Contents<span></span>
      </a>
      {/* <MarkdownText content={toc} /> */}
      <div className="sections-panel sections-panel--from-top">
        <div className="sections-panel__container">
          <button type="button" className="close-fixed-nav">
            <i className="material-icons">close</i>
          </button>
          <div className="row expanded">
            <div className="column large-12 section-link-column"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedNav;
