import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const SidebarGallery = ({ sidebarImageData, title }) => {
  return (
    <div className="col-span-8 lg:col-span-2 lg:col-start-5 sidebar-image">
      {sidebarImageData.map(sidebarImage => {
        return (
          <div
            key={sidebarImage.id}
            className="sidebar-image__container"
          >
            <GatsbyImage
              image={getImage(sidebarImage)}
              alt={`${sidebarImage.title} image`}
            />
            <p className="sidebar-image__description">{sidebarImage.description}</p>
          </div>
        )
      })}
    </div>
  );
};
