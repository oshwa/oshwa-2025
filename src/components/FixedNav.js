import React from 'react';
import MarkdownText from './MarkdownText';
import TableOfContents from './TableOfContents';

const FixedNav = ({ toc, content }) => {
  // console.log(toc)

  return (
    <div className="fixed-nav p-10 pt-5 pb-10">
      <a href="#" className="fixed-nav__dropdown">
        Table of Contents<span><i className="material-icons">expand_more</i></span>
      </a>
      {/* <MarkdownText content={toc} /> */}

      <div className="fixed-nav__panel">
        <TableOfContents content={content} />
      </div>

      {/* <div className="sections-panel sections-panel--from-top">
        <div className="sections-panel__container">
          <button type="button" className="close-fixed-nav">
            <i className="material-icons">close</i>
          </button>
          <div className="row expanded">
            <div className="column large-12 section-link-column"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FixedNav;
