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
    let date = pubDateSelect.value;

    sessionStorage.setItem(sessionsName, JSON.stringify({ date }));

    setQuery(
      `+date:${date} +contentfulType:${contentfulType}`
    );
  };

  const matchFiltersToSessions = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName));

    // set date filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.date) {
      Array.from(pubDateSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.date) {
          pubDateSelect.selectedIndex = idx;
        }
      });
    }
    setQuery(
      `+date:${pubDateSelect.value} +contentfulType:${contentfulType}`
    );
  };

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+date:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
    location.search = ''; // tk remove from url
  };

  const handleUrlParams = useCallback(() => {
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';

    setPubDateQuery(pubDateParam);
    setQuery(
      `+date:${pubDateParam} +contentfulType:${contentfulType}`
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

  const sortByDateDesc = (results) => {
    return results.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];
    handleUrlParams();
    matchFiltersToSessions();
    const searchResults = lunrIndex.index.search(query);
    const searchResultsMapped = searchResults.map(({ ref }) => {
      return lunrIndex.store[ref];
    });
    setResults(sortByDateDesc(searchResultsMapped));
  }, [query, handleUrlParams]);

  return (
    <>
      <Layout>
        <>
          <div className="px-8">
            <div className="grid lg:grid-cols-5 md:grid-cols-5">
              <div className="col-span-10 mb-5 notched notched--border">
                <h1 className="generic-heading-1">Announcements</h1>
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
                      key={result.id}
                      to={`/announcements/${result.prettyUrl}`}
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
