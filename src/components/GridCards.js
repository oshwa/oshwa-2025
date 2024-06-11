import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
const GridCards = ({ items, listType }) => {
  return (
    <>
      <div className="p-10 pt-0 pb-5 list">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
          {items &&
            items.map(
              item =>
                // item.prettyUrl && (
                <Link
                  key={item.prettyUrl}
                  to={listType === "resources" ? `/resources/${item.prettyUrl}` : `/blog-post/${item.prettyUrl}`}
                  className="lg:col-span-1 notched notched--border notched--border--hover list-item"
                >
                  <div>
                    {
                      listType === "blog-post" &&
                      <p className="publicationDate publicationDate--blog">
                        {dayjs(item.date).format('MMMM D, YYYY')}
                      </p>
                    }
                    <p className="title"> {item.title}</p>
                    {
                      listType === "resources" &&
                      <p className="publicationDate">
                        {dayjs(item.resourceDate).format('MMMM D, YYYY')}
                      </p>
                    }
                  </div>
                  {
                    listType === "resources" &&
                    <p className="type">{item.type}</p>
                  }
                </Link>
              // )
            )}
        </div>
      </div >
    </>
  );
};

export default GridCards;
