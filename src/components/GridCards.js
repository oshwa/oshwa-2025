import React from 'react';
import dayjs from 'dayjs';

const GridCards = ({ items, listType, openInNewTab = false }) => {
  return (
    <>
      <div className={listType === 'resources-ref' ? `list` : `list`}>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
          {items &&
            items.map(
              (item, idx) => (
                <a
                  key={`${item.prettyUrl}-${idx}`}
                  href={
                    listType === 'resources'
                      ? `/resources/${item.prettyUrl}`
                      : `/resources/${item.prettyUrl}`
                  }
                  className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
                  target={openInNewTab ? '_blank' : '_self'}
                  rel={openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <div>
                    {listType === 'blog-post' && (
                      <p className="publicationDate publicationDate--blog">
                        {dayjs(item.date).format('MMMM D, YYYY')}
                      </p>
                    )}
                    <p className="title"> {item.title}</p>
                  </div>
                  {(listType === 'resources' ||
                    listType === 'resources-ref') && (
                      <>
                        <p className="title">{item.resourceTitle}</p>
                        <p className="type">{item.resourceType}</p>
                      </>
                    )}
                </a>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default GridCards;
