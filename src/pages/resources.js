import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';
import GridCards from '../components/GridCards';
const sessionsName = 'resource-filters';

const Search = ({ data, location }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const contentfulType = 'ContentfulGlobalResourceContainer';

  const capFirstLet = str => {
    if (str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  };

  const formatAudienceQuery = audienceQuery => {
    if (audienceQuery === 'Academic') {
      return 'Academic -Non-academic';
    } else {
      return audienceQuery;
    }
  };

  const handleSearchQuery = event => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubTypeSelect = document.querySelector('#publicationType');
    let pubAudienceSelect = document.querySelector('#publicationAudience');

    let pubDateValue = pubDateSelect.value;
    let pubTypeValue = pubTypeSelect.value;
    let pubAudienceValue = pubAudienceSelect.value;

    sessionStorage.setItem(
      sessionsName,
      JSON.stringify({ pubDateValue, pubTypeValue, pubAudienceValue })
    );

    setQuery(
      `+title:* +resourceDate:${pubDateValue} +resourceType:${pubTypeValue} +resourceAudience:${formatAudienceQuery(
        pubAudienceValue
      )}* +contentfulType:${contentfulType}`
    );
  };

  const handleUrlParams = useCallback(() => {
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';
    let pubTypeParam = new URLSearchParams(location.search).get('type') || '*';
    let pubAudienceParam =
      new URLSearchParams(location.search).get('audience') || '*';

    setPubDateQuery(pubDateParam);
    setPubTypeQuery(capFirstLet(pubTypeParam));
    setPubAudienceQuery(capFirstLet(pubAudienceParam));

    setQuery(
      `+title:* +resourceDate:${pubDateParam} +resourceType:${pubTypeParam} +resourceAudience:${formatAudienceQuery(
        pubAudienceParam
      )}* +contentfulType:${contentfulType}`
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

  const setPubTypeQuery = paramVal => {
    let pubTypeSelect = document.querySelector('#publicationType');
    Array.from(pubTypeSelect.options).forEach((option, idx) => {
      if (option.value === paramVal) {
        pubTypeSelect.selectedIndex = idx;
      }
    });
  };

  const setPubAudienceQuery = paramVal => {
    let pubAudienceSelect = document.querySelector('#publicationAudience');
    Array.from(pubAudienceSelect.options).forEach((option, idx) => {
      if (option.value === paramVal) {
        pubAudienceSelect.selectedIndex = idx;
      }
    });
  };

  const matchFiltersToSessions = useCallback(() => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubTypeSelect = document.querySelector('#publicationType');
    let pubAudienceSelect = document.querySelector('#publicationAudience');
    let savedSessionsQuery = JSON.parse(sessionStorage.getItem(sessionsName));

    // set date filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubDateValue) {
      setPubDateQuery(savedSessionsQuery.pubDateValue);
    }

    // set type filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubTypeValue) {
      setPubTypeQuery(savedSessionsQuery.pubTypeValue);
    }

    // set audience filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubAudienceValue) {
      setPubAudienceQuery(savedSessionsQuery.pubAudienceValue);
    }
    setQuery(
      `+title:* +resourceDate:${pubDateSelect.value} +resourceType:${
        pubTypeSelect.value
      } +resourceAudience:${formatAudienceQuery(
        pubAudienceSelect.value
      )} +contentfulType:${contentfulType}`
    );
  }, []);

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+title:* +resourceDate:* +resourceType:* +resourceAudience:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
    document.querySelector('#publicationType').selectedIndex = 0;
    document.querySelector('#publicationAudience').selectedIndex = 0;
    location.search = ''; // tk remove from url
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
  }, [query, location, handleUrlParams, matchFiltersToSessions]);

  return (
    <>
      <Layout>
        <>
          <div className="px-8">
            <div className="grid lg:grid-cols-5 md:grid-cols-5">
              <div className="col-span-10 mb-5 notched notched--border">
                <h1 className="generic-heading-1">Resources</h1>
              </div>
              {/* <div>{sessionStorage.getItem('resource-filters')}</div> */}
            </div>
          </div>

          <FilterBar
            handleSearchQuery={handleSearchQuery}
            handleClearFilters={clearFilters}
            listType="resources"
          />
          <div className="resource-cards-wrapper px-8 py-4">
            <GridCards items={results} listType="resources" />
          </div>
        </>
      </Layout>
    </>
  );
};

export default Search;
