import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
import { FilterBar } from '../components/FilterBar';
// import GridCards from '../components/GridCards';
const sessionsName = 'blog-post-filters';

const SearchBlogPosts = ({ location }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const contentfulType = 'ContentfulBlogPost';

  const handleSearchQuery = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubDateValue = pubDateSelect.value;

    sessionStorage.setItem(sessionsName, JSON.stringify({ pubDateValue }));

    setQuery(
      `+title:* +date:${pubDateValue} +contentfulType:${contentfulType}`
    );
  };

  const matchFiltersToSessions = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName));

    // set date filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubDateValue) {
      Array.from(pubDateSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.pubDateValue) {
          pubDateSelect.selectedIndex = idx;
        }
      });
    }
    setQuery(
      `+title:* +date:${pubDateSelect.value} +contentfulType:${contentfulType}`
    );
  };

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+title:* +date:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
    location.search = ''; // tk remove from url
  };

  const handleUrlParams = useCallback(() => {
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';

    setPubDateQuery(pubDateParam);
    setQuery(
      `+title:* +date:${pubDateParam} +contentfulType:${contentfulType}`
    );
  }, [location]);

  const setPubDateQuery = paramVal => {
    let pubDateSelect = document.querySelector('#publicationDate');
    Array.from(pubDateSelect.options).forEach((option, idx) => {
      if (option.value === paramVal) {
        pubDateSelect.selectedIndex = idx;
      }
    });
  };

  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];
    handleUrlParams();
    matchFiltersToSessions();
    const searchResults = lunrIndex.index.search(query);

    setResults(
      searchResults.map(({ ref }) => {
        return lunrIndex.store[ref];
      })
    );
  }, [query, handleUrlParams]);

  return (
    <>
      <Layout>
        <>
          <div className="px-8">
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

          <div className={`px-8 py-4 list`}>
            <div className="grid grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {results &&
                results.map(
                  result => (
                    // item.prettyUrl && (
                    <Link
                      key={result.prettyUrl}
                      to={`/blog-posts/${result.prettyUrl}`}
                      className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
                    >
                      <div>
                        <p className="publicationDate publicationDate--blog">
                          {dayjs(result.date).format('MMMM D, YYYY')}
                        </p>

                        <p className="title"> {result.title}</p>
                      </div>
                    </Link>
                  )
                  // )
                )}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export default SearchBlogPosts;
