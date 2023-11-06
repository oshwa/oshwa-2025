import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';
import dayjs from 'dayjs';
const sessionsName = 'resource-filters';

const Search = ({ data }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);

  const handleSearchQuery = event => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubTypeSelect = document.querySelector('#publicationType');

    let pubDateValue = pubDateSelect.value;
    let pubTypeValue = pubTypeSelect.value;

    sessionStorage.setItem(
      sessionsName,
      JSON.stringify({ pubDateValue, pubTypeValue })
    );

    setQuery(`+title:* +publicationDate:${pubDateValue} +type:${pubTypeValue}`);
  };

  const matchFiltersToSessions = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubTypeSelect = document.querySelector('#publicationType');
    let savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName));

    // set date filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubDateValue) {
      Array.from(pubDateSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.pubDateValue) {
          pubDateSelect.selectedIndex = idx;
        }
      });
    }

    // set type filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubTypeValue) {
      Array.from(pubTypeSelect.options).forEach((option, idx) => {
        console.log(option, idx);
        if (option.value === savedSessionsQuery.pubTypeValue) {
          pubTypeSelect.selectedIndex = idx;
        }
      });
    }
    setQuery(
      `+title:* +publicationDate:${pubDateSelect.value} +type:${pubTypeSelect.value}`
    );
  };

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+title:* +publicationDate:* +type:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
    document.querySelector('#publicationType').selectedIndex = 0;
  };
  
  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];
    matchFiltersToSessions();
    const searchResults = lunrIndex.index.search(query);
    setResults(
      searchResults.map(({ ref }) => {
        return lunrIndex.store[ref];
      })
    );
  }, [query]);

  return (
    <>
      <Layout>
        <>
          <div className="p-8 pt-0 pb-5">
            <div className="grid lg:grid-cols-5 md:grid-cols-5">
              <div className="col-span-10 mb-5 notched notched--border">
                <h1 className="generic-heading-1">Resources</h1>
              </div>
              <FilterBar
                handleSearchQuery={handleSearchQuery}
                handleClearFilters={clearFilters}
              />
              <div>{sessionStorage.getItem('resource-filters')}</div>
            </div>
          </div>

          <div className="p-8 pt-0 pb-5 list">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
              {results &&
                results.map(
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
                            {dayjs(resource.publicationDate).format(
                              'MMMM D, YYYY'
                            )}
                          </p>
                        </div>
                        <p className="type">{resource.type}</p>
                      </Link>
                    )
                )}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export default Search;
