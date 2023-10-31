import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';

const Search = () => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];

    const searchResults = lunrIndex.index.search(query);

    setResults(
      searchResults.map(({ ref }) => {
        console.log(ref);

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
              <FilterBar />
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
                results.map(resource => (
                  <Link
                    key={resource.id}
                    to={`/resources/${resource.prettyUrl}`}
                    className="lg:col-span-1 notched notched--border notched--border--hover list-item"
                  >
                    <p className="title">{resource.title}</p>
                    <span className="type">Type</span>
                  </Link>
                ))}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export default Search;
