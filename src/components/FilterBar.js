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
    <div className="col-span-10 notched notched--border filters">
      <CustomDropdown
        handleSearchQuery={handleSearchQuery}
        defaultLabel={`All Years`}
        label={`Publication Date`}
        options={pubDates}
      />
      <CustomDropdown
        handleSearchQuery={handleSearchQuery}
        defaultLabel={`All Types`}
        label={`Publication Type`}
        options={pubTypes}
      />
      <button onClick={handleClearFilters} className="filters__filter--clear">Clear filters</button>
    </div>
  );
};
