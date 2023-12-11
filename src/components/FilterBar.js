import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CustomDropdown from './CustomDropdown';
import uniq from 'lodash.uniq';

export const FilterBar = ({ handleSearchQuery, handleClearFilters }) => {
  const data = useStaticQuery(graphql`
    query FilterQuery {
      allContentfulProduct {
        edges {
          node {
            type
            publicationYear: publicationDate(formatString: "YYYY")
            publicationDate
          }
        }
      }
    }
  `);
  const pubDates = uniq(
    data.allContentfulProduct.edges
      .map(content => content.node)
      .map(node => node.publicationYear)
      .sort()
      .reverse()
  );

  const pubTypes = uniq(
    data.allContentfulProduct.edges
      .map(content => content.node)
      .map(node => node.type)
      .sort()
  );
  return (
    <div className="p-10 pt-0 pb-5">
      <div className="filter-bar grid lg:grid-cols-5 md:grid-cols-5 notched--border">
        <div className="filter-item lg:col-span-1 sm:col-span-5 ">
          <CustomDropdown
            handleSearchQuery={handleSearchQuery}
            defaultLabel={`All Years`}
            label={`Publication Date`}
            options={pubDates}
          />
        </div>
        <div className="filter-item lg:col-span-1 lg:col-start-2 sm:col-span-5">
          <CustomDropdown
            handleSearchQuery={handleSearchQuery}
            defaultLabel={`All Types`}
            label={`Publication Type`}
            options={pubTypes}
          />
        </div>

        <button onClick={handleClearFilters} className="filters__filter--clear filter-item lg:col-span-1 sm:col-span-5 lg:col-start-5 sm:col-start-1 lg:text-right sm:text-left">
          Clear filters
        </button>
      </div>
    </div>
  );
};
