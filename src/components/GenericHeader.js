import React from 'react';
import MarkdownText from './MarkdownText';

export const GenericHeader = ({ title, description, headerImageUrl, program, location }) => {
  return (
    <div className="px-8">
      <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4">
        {headerImageUrl ?
          <div
            className="lg:col-span-3 md:col-span-5 sm:col-span-5 h-full notched notched--bg notched--bg--img header-img-container"
            style={{ backgroundImage: `url(${headerImageUrl})` }}>
          </div>
          :
          <div className="lg:col-span-3 md:col-span-5 sm:col-span-5 h-full notched notched--bg notched--bg--img header-img-container"></div>
        }
        <div className="generic-header lg:col-span-2 md:col-span-5 sm:col-span-5 h-full notched notched--border">
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