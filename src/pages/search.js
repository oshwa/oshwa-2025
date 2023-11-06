import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';

const Search = ({ data }) => {
  const [query, setQuery] = useState(`+title:* +publicationDate:* +type:*`);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];
    const searchResults = lunrIndex.index.search(query);
    setResults(
      searchResults.map(({ ref }) => {
        return lunrIndex.store[ref];
      })
    );
  }, [query]);

  const handleSearchQuery = target => {
    let pubYearQuery = document.querySelector('select#publicationDate');
    let pubTypeQuery = document.querySelector('select#publicationType');
    // debugger
    // let searchQuery = `+title:* +publicationDate:${
    //   target.id === 'publicationDate'
    //     ? target.options[target.selectedIndex].value
    //     : pubYearQuery[pubYearQuery.selectedIndex].value || '*'
    // } +type:${
    //   target.id === 'publicationType'
    //     ? target.options[target.selectedIndex].value
    //     : pubTypeQuery[pubTypeQuery.selectedIndex].value || '*'
    // }`;
    let searchQuery = `+title:* +publicationDate:${
      target.id === 'publicationDate'
        ? pubYearQuery[pubYearQuery.selectedIndex].value
        : '*'
    } +type:${
      target.id === 'publicationType'
        ? pubTypeQuery[pubTypeQuery.selectedIndex].value
        : '*'
    }`;

    console.log(searchQuery);
    setQuery(searchQuery);
  };

  return (
    <>
      <Layout>
        <>
          <div className="p-8 pt-0 pb-5">
            <div className="grid lg:grid-cols-5 md:grid-cols-5">
              <div className="col-span-10 mb-5 notched notched--border">
                <h1 className="generic-heading-1">Resources</h1>
              </div>
              <FilterBar handleSearchQuery={handleSearchQuery} />
              <div>
                <input
                  className="search"
                  placeholder="Enter search term"
                  type="text"
                  defaultValue={query}
                  onChange={event => {
                    setQuery(event.target.value);
                  }}
                />
              </div>
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
                        <p className="title"> {resource.title}</p>
                        <span className="type">{resource.type}</span>
                        <span className="publicationDate">
                          {resource.publicationDate}
                        </span>
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
