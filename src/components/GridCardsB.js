import React from 'react';
import { Link } from 'gatsby';

const GridCardsB = ({ items, pageLocation, page }) => {
  return (
    <>
      <div className="px-8 py-4 list">
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 gap-4">
          {page === 'programs-page' && (
            <>
              <a
                key="Certification"
                href="https://certification.oshwa.org/"
                className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
              >
                <h3>Certification</h3>
              </a>
              <a
                key="Certification API"
                href="https://certificationapi.oshwa.org/documentation"
                className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
              >
                <h3>Certification API</h3>
              </a>
            </>
          )}
          {items &&
            items.map(item => (
              <Link
                key={item.title}
                to={`/${pageLocation}/${item.prettyUrl ? item.prettyUrl : item.title
                  }`}
                className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
              >
                <h3>{item.title}</h3>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default GridCardsB;
