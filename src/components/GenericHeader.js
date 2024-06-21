import React from 'react';
import MarkdownText from './MarkdownText';

export const GenericHeader = ({ title, description, headerImageUrl, program, location }) => {
  return (
    <div className="p-10 pt-0">
      <div className="grid lg:grid-cols-5 md:grid-cols-5">
        <div className="col-span-3 lg:mr-5 md:mr-5 h-full notched notched--bg notched--bg--img header-img-container" style={{ backgroundImage: `url(${headerImageUrl})` }}></div>
        <div className="generic-header col-span-2 h-full notched notched--border xs:mt-5 sm:mt-5">
          {program && (
            <span className="program-title">{program}</span>
          )}
          <h1 className="generic-heading-1">{title}</h1>
          {description && (
            <MarkdownText content={description} />
          )}
          {location && (
            <p className="location">{location}</p>
          )}
        </div>
      </div>
    </div>
  );
};