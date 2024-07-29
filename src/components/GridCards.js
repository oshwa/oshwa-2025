import React from 'react';
import { Link } from 'gatsby';
import dayjs from 'dayjs';

const GridCards = ({ items, listType }) => {
  return (
    <>
      <div className={listType === 'resources-ref' ? `list` : `list`}>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
          {items &&
            items.map(
              (item, idx) => (
                // item.prettyUrl && (
                <Link
                  key={`${item.prettyUrl}-${idx}`}
                  to={
                    listType === 'resources'
                      ? `/resources/${item.prettyUrl}`
                      : `/resources/${item.prettyUrl}`
                  }
                  className="lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--border notched--border--hover list-item"
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
                </Link>
              )
              // )
            )}
        </div>
      </div>
    </>
  );
};

export default GridCards;
