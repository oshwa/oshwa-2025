import React from 'react';

const MarkdownText = ({ content }) => {
  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MarkdownText;
