import React from 'react';
import { Link } from 'gatsby';

const GridCardsB = ({ items, pageLocation }) => {
  return (
    <>
      <div className="p-10 pt-0 pb-5 list">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
          {items &&
            items.map(
              item =>
                <Link
                  key={item.title}
                  to={`/${pageLocation}/${item.id}`}
                  className="lg:col-span-1 notched notched--border notched--border--hover list-item"
                >
                  <h3>{item.title}</h3>
                </Link>
            )}
        </div>
      </div >
    </>
  );
};

export default GridCardsB;
