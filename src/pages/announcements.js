import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../components/layout';
import dayjs from 'dayjs';

import { FilterBar } from '../components/FilterBar';
import Seo from '../components/seo';
const sessionsName = 'blog-post-filters';

const blogPostMatchesTextSearch = (doc, searchText) => {
  const terms = searchText
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!terms.length) return true;

  const title = (doc.title || '').toLowerCase();
  return terms.every(term => title.includes(term));
};

const SearchBlogPosts = ({ location }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchDebounceRef = useRef(null);
  const contentfulType = 'ContentfulBlogPost';

  const formatQuery = ({ date = '', contentfulType = '' }) => {
    let dateQuery = date && date !== '*' ? `+date:${date}` : '';
    let contentfulTypeQuery = `+contentfulType:${contentfulType}`;

    return `${dateQuery} ${contentfulTypeQuery}`;
  };

  const handleSearchQuery = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let date = pubDateSelect.value;
    const textSearchValue =
      typeof document !== 'undefined'
        ? document.querySelector('#resourceSearchInput')?.value || ''
        : '';

    sessionStorage.setItem(sessionsName, JSON.stringify({ date, textSearchValue }));

    const formattedQuery = formatQuery({ date, contentfulType });
    setQuery(formattedQuery);
  };

  const matchFiltersToSessions = useCallback(() => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let savedSessionsQuery = {};
    try {
      savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName)) || {};
    } catch {
      savedSessionsQuery = {};
    }

    if (savedSessionsQuery && savedSessionsQuery.date) {
      Array.from(pubDateSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.date) {
          pubDateSelect.selectedIndex = idx;
        }
      });
    }

    const urlHasQ = new URLSearchParams(location.search).has('q');
    if (!urlHasQ && typeof savedSessionsQuery.textSearchValue === 'string') {
      setSearchInput(savedSessionsQuery.textSearchValue);
    }

    const formattedQuery = formatQuery({ date: pubDateSelect.value, contentfulType });
    setQuery(formattedQuery);
  }, [contentfulType]);

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    document.querySelector('#publicationDate').selectedIndex = 0;
    setSearchInput('');
    location.search = '';
    setQuery(formatQuery({ date: '*', contentfulType }));
  };

  const handleUrlParams = useCallback(() => {
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchInput(params.get('q') || '');
    }

    let pubDateSelect = document.querySelector('#publicationDate');
    Array.from(pubDateSelect.options).forEach((option, idx) => {
      if (option.value === pubDateParam) {
        pubDateSelect.selectedIndex = idx;
      }
    });

    const formattedQuery = formatQuery({ date: pubDateParam, contentfulType });
    setQuery(formattedQuery);
  }, [location, contentfulType]);

  const sortByDateDesc = results => {
    return results.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  useEffect(() => {
    handleUrlParams();
    matchFiltersToSessions();
  }, [location, handleUrlParams, matchFiltersToSessions]);

  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      let savedSessionsQuery = {};
      try {
        savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName)) || {};
      } catch {
        savedSessionsQuery = {};
      }
      sessionStorage.setItem(
        sessionsName,
        JSON.stringify({ ...savedSessionsQuery, textSearchValue: searchInput })
      );
    }, 250);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchInput]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.__LUNR__?.['en']) {
      return;
    }
    const lunrIndex = window.__LUNR__['en'];
    const searchResults = lunrIndex.index.search(query);
    const searchResultsMapped = searchResults.map(({ ref }) => lunrIndex.store[ref]);
    const sorted = sortByDateDesc(searchResultsMapped);
    const filtered = debouncedSearch
      ? sorted.filter(doc => blogPostMatchesTextSearch(doc, debouncedSearch))
      : sorted;

    setResults(filtered);
  }, [query, debouncedSearch]);

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
            searchValue={searchInput}
            onSearchChange={setSearchInput}
          />

          <div className={`px-8 py-4 list`}>
            <div className="grid grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {results &&
                results.map(
                  result => (
                    <a
                      key={result.id}
                      href={`/announcements/${result.prettyUrl}`}
                      className="lg:col-span-1 md:col-span-2 sm:col-span-4 notched notched--border notched--border--hover list-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={result.title}
                    >
                      <div>
                        <p className="publicationDate publicationDate--blog">
                          {dayjs(result.date).format('MMMM D, YYYY')}
                        </p>

                        <p className="title">{result.title}</p>
                      </div>
                    </a>
                  )
                )}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export const Head = () =>
  <Seo
    title="Announcements"
    description="The Open Source Hardware Association (OSHWA) aims to foster technological knowledge and encourage research that is accessible, collaborative and respects user freedom."
  />;

export default SearchBlogPosts;
