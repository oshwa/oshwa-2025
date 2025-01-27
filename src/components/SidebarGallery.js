import React from 'react';
import MarkdownText from './MarkdownText';

export const SidebarGallery = ({ data }) => {
  console.log(data)
  return (
    <div className="col-span-8 lg:col-span-2 sidebar-image">
      {data.map(figure => {
        return (
          <div
            key={figure.id}
            className="sidebar-image__container"
          >
            { figure.image && <img src={figure.image.url} alt={figure.image.description} />}
            <div className="sidebar-image__description">
              <MarkdownText content={figure.caption.childMarkdownRemark.html} />
            </div>
          </div>
        )
      })}
    </div>
  );
};
