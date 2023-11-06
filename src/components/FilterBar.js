import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CustomDropdown from './CustomDropdown';
import uniq from 'lodash.uniq';

export const FilterBar = ({ handleSearchQuery }) => {
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
        label={'Publication Date'}
        options={pubDates}
      />
      <CustomDropdown
        handleSearchQuery={handleSearchQuery}
        label={'Publication Type'}
        options={pubTypes}
      />
      <span className="filters__filter--clear">Clear filters</span>
    </div>
  );
};
