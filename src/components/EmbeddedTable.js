import React from 'react';
import MarkdownText from './MarkdownText';

const EmbeddedTable = ({ title, table, caption }) => {
  return (
    <div className="embedded-table notched notched--border">
      <h3>{title}</h3>
      <figure
        aria-labelledby={caption.id}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: table.childMarkdownRemark.html }}
      ></figure>
      <p
        id={caption.id}
        dangerouslySetInnerHTML={{ __html: caption.childMarkdownRemark.html }}
      />
    </div>
  );
};

export default EmbeddedTable;
