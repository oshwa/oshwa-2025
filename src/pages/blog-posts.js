import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';
import GridCards from '../components/GridCards';
const sessionsName = 'blog-post-filters';

const SearchBlogPosts = () => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);

  const handleSearchQuery = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubDateValue = pubDateSelect.value;

    sessionStorage.setItem(
      sessionsName,
      JSON.stringify({ pubDateValue })
    );

    setQuery(`+title:* +publicationDate:${pubDateValue}`);
  };

  console.log("QUERY", query)
  console.log("sessionStorage inside blog-post", sessionStorage)
  console.log("results in blog-post", results)

  const matchFiltersToSessions = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName));
    console.log("savedSessionsQuery inside blog posts", savedSessionsQuery)

    // set date filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubDateValue) {
      Array.from(pubDateSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.pubDateValue) {
          pubDateSelect.selectedIndex = idx;
        }
      });
    }
    setQuery(
      `+title:*`
      // `+title:* +publicationDate:${pubDateSelect.value}`
    );
  };

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+title:* +publicationDate:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
  };

  useEffect(() => {
    const lunrIndex = window.__LUNR__['fr'];
    matchFiltersToSessions();
    const searchResults = lunrIndex.index.search(query);
    console.log("searchResults", searchResults)

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
          <div className="p-10 pt-0 pb-0">
            <div className="grid lg:grid-cols-5 md:grid-cols-5">
              <div className="col-span-10 mb-5 notched notched--border">
                <h1 className="generic-heading-1">Blog Posts</h1>
              </div>
            </div>
          </div>
          <FilterBar
            handleClearFilters={clearFilters}
            handleSearchQuery={handleSearchQuery}
            listType="blog-post"
          />
          <GridCards items={results} listType="blog-post" />
        </>
      </Layout>
    </>
  );
};

export default SearchBlogPosts;
