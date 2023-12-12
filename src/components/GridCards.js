import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
const GridCards = ({ items }) => {
  return (
    <>
      <div className="p-10 pt-0 pb-5 list">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
          {items &&
            items.map(
              resource =>
                resource.prettyUrl && (
                  <Link
                    key={resource.prettyUrl}
                    to={`/resources/${resource.prettyUrl}`}
                    className="lg:col-span-1 notched notched--border notched--border--hover list-item"
                  >
                    <div>
                      <p className="title"> {resource.title}</p>
                      <p className="publicationDate">
                        {dayjs(resource.publicationDate).format('MMMM D, YYYY')}
                      </p>
                    </div>
                    <p className="type">{resource.type}</p>
                  </Link>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default GridCards;
