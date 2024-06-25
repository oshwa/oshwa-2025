import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CustomDropdown from './CustomDropdown';
import uniq from 'lodash.uniq';

export const FilterBar = ({
  handleSearchQuery,
  handleClearFilters,
  listType,
}) => {
  const data = useStaticQuery(graphql`
    query FilterQuery {
      allContentfulGlobalResourceContainer {
        edges {
          node {
            resourceTitle
            publicationYear: resourceDate(formatString: "YYYY")
            resourceDate
            resourceType
            resourceAudience
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            publicationYear: date(formatString: "YYYY")
            date
          }
        }
      }
    }
  `);

  const pubDates = uniq(
    data.allContentfulGlobalResourceContainer.edges
      .map(content => content.node)
      .map(node => node.publicationYear)
      .sort()
      .reverse()
      .filter(year => year)
   
  );

  const pubTypes = uniq(
    data.allContentfulGlobalResourceContainer.edges
      .map(content => content.node)
      .map(node => node.resourceType)
      .sort()
      .filter(type => type)
  );

  const pubAudience = uniq(
    data.allContentfulGlobalResourceContainer.edges
      .map(content => content.node)
      .map(node => node.resourceAudience)
      .join()
      .split(',')
      .sort()
      .filter(audience => audience)
  );

  const pubDatesBlogPost = uniq(
    data.allContentfulBlogPost.edges
      .map(content => content.node)
      .map(node => node.publicationYear)
      .sort()
      .reverse()
  );

  return (
    <div className="px-8">
      <div className="p-8 w-full notched notched--border filter-container">
      
      <div className=" grid lg:grid-cols-12 md:grid-cols-12 gap-2 filter-bar px-8">
        <div className="lg:col-span-3 md:col-span-4 filter-item">
          <CustomDropdown
            handleSearchQuery={handleSearchQuery}
            defaultLabel={`All Years`}
            label={`Publication Date`}
            options={listType === 'resources' ? pubDates : pubDatesBlogPost}
          />
        </div>
        {listType === 'resources' && (
          <div className="lg:col-span-3 md:col-span-4 filter-item">
            <CustomDropdown
              handleSearchQuery={handleSearchQuery}
              defaultLabel={`All Types`}
              label={`Publication Type`}
              options={pubTypes}
            />
          </div>
        )}

        {listType === 'resources' && (
          <div className="lg:col-span-3 md:col-span-4 filter-item">
            <CustomDropdown
              handleSearchQuery={handleSearchQuery}
              defaultLabel={`All Audiences`}
              label={`Publication Audience`}
              options={pubAudience}
            />
          </div>
        )}

        <div className="lg:col-span-3 md:col-span-12 lg:col-start-11">
          <button
            onClick={handleClearFilters}
            className="filters__filter--clear"
          >
            Clear filters
          </button>
        </div>
      </div>
      </div>

    </div>
  );
};
