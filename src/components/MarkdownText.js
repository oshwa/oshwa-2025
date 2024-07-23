import React from 'react';

const MarkdownText = ({ content }) => {
  return <span className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MarkdownText;
