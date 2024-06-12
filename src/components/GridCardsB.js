import React from 'react';
import { Link } from 'gatsby';

const GridCardsB = ({ items, pageLocation, page }) => {
  return (
    <>
      <div className="p-10 pt-0 pb-5 list">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
          {page === "programs-page" && (
            <>
              <Link
                key="Certification"
                to="https://certification.oshwa.org/"
                className="lg:col-span-1 notched notched--border notched--border--hover list-item"
              >
                <h3>Certification</h3>
              </Link>
              <Link
                key="Certification API"
                to="https://certificationapi.oshwa.org/documentation"
                className="lg:col-span-1 notched notched--border notched--border--hover list-item"
              >
                <h3>Certification API</h3>
              </Link>
            </>
          )}
          {items &&
            items.map(
              item =>
                <Link
                  key={item.title}
                  to={`/${pageLocation}/${item.prettyUrl ? item.prettyUrl : item.title}`}
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
