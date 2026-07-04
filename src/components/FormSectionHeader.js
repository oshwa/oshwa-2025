import React from 'react';

export default ({ content }) => (
  <div className="form-section-header">
    <div className=" flex justify-between">
      <h2 className="generic-heading-2 py-8">{content.title}</h2>
      <p className="form-heading py-8">{content.subtitle}</p>
    </div>
    <div
      className="py-4"
      dangerouslySetInnerHTML={{ __html: content.introduction }}
    />
  </div>
);
