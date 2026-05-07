import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CustomDropdown from './CustomDropdown';
import uniq from 'lodash.uniq';

export const FilterBar = ({
  handleSearchQuery,
  handleClearFilters,
  listType,
  searchValue,
  onSearchChange,
}) => {
  const isResourcesList = listType === 'resources';
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

  const dropdownLgSpan = 'xl:col-span-2 lg:col-span-2';
  const dropdownMdSpan = 'md:col-span-3';

  const textSearchSpan = isResourcesList
    ? `${dropdownMdSpan} xl:col-span-2 lg:col-span-2`
    : `${dropdownMdSpan} xl:col-span-2 lg:col-span-4`;

  const yearFilterSpan = isResourcesList
    ? `${dropdownLgSpan} ${dropdownMdSpan}`
    : `${dropdownMdSpan} xl:col-span-2 lg:col-span-3`;

  const clearFilterSpan = isResourcesList
    ? 'xl:col-span-2 lg:col-span-3 md:col-span-6'
    : 'xl:col-span-6 lg:col-span-5 md:col-span-6';

  return (
    <div className="px-8">
      <div className="p-8 w-full notched notched--border filter-container">
        <div className="grid xl:grid-cols-10 lg:grid-cols-12 md:grid-cols-6 gap-x-8 gap-y-2 md:gap-y-0 sm:gap-y-0 filter-bar px-8">
          <div className={`${textSearchSpan} filter-item filter-item--text-search`}>
            <div className="filter-item__text-input-wrap">
              <input
                id="resourceSearchInput"
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                placeholder="Search"
                className="filter-item__text-input"
                value={searchValue}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className={`${yearFilterSpan} filter-item`}>
            <CustomDropdown
              handleSearchQuery={handleSearchQuery}
              defaultLabel={`All Years`}
              label={`Publication Date`}
              options={listType === 'resources' ? pubDates : pubDatesBlogPost}
            />
          </div>
          {isResourcesList && (
            <div className={`${dropdownLgSpan} ${dropdownMdSpan} filter-item`}>
              <CustomDropdown
                handleSearchQuery={handleSearchQuery}
                defaultLabel={`All Types`}
                label={`Publication Type`}
                options={pubTypes}
              />
            </div>
          )}

          {isResourcesList && (
            <div className={`xl:col-span-2 lg:col-span-3 ${dropdownMdSpan} filter-item`}>
              <CustomDropdown
                handleSearchQuery={handleSearchQuery}
                defaultLabel={`All Audiences`}
                label={`Publication Audience`}
                options={pubAudience}
              />
            </div>
          )}

          <div className={`${clearFilterSpan} filter-item--clear-wrap`}>
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
