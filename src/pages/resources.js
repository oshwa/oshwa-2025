import React, { useState, useEffect } from 'react';
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
      `+title:* +resourceDate:${pubDateValue} +resourceType:${pubTypeValue} +resourceAudience:${pubAudienceValue} +contentfulType:${contentfulType}`
    );
  };

  const handleUrlParams = () => {
    console.log(location.search, 'location search');
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';
    let pubTypeParam = new URLSearchParams(location.search).get('type') || '*';
    let pubAudienceParam =
      new URLSearchParams(location.search).get('audience') || '*';

    setPubDateQuery(pubDateParam);
    setPubTypeQuery(capFirstLet(pubTypeParam));
    setPubAudienceQuery(capFirstLet(pubAudienceParam));

    setQuery(
      `+title:* +resourceDate:${pubDateParam} +resourceType:${pubTypeParam} +resourceAudience:${pubAudienceParam} +contentfulType:${contentfulType}`
    );

  };

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
      // console.log(option, idx);
      if (option.value === paramVal) {
        pubTypeSelect.selectedIndex = idx;
      }
    });
  };

  const setPubAudienceQuery = paramVal => {
    let pubAudienceSelect = document.querySelector('#publicationAudience');
    Array.from(pubAudienceSelect.options).forEach((option, idx) => {
      // console.log(option, idx);
      if (option.value === paramVal) {
        pubAudienceSelect.selectedIndex = idx;
      }
    });
  };

  const matchFiltersToSessions = () => {
    let pubDateSelect = document.querySelector('#publicationDate');
    let pubTypeSelect = document.querySelector('#publicationType');
    let pubAudienceSelect = document.querySelector('#publicationAudience');
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
        // console.log(option, idx);
        if (option.value === savedSessionsQuery.pubTypeValue) {
          pubTypeSelect.selectedIndex = idx;
        }
      });
    }

    // set audience filter to sessions
    if (savedSessionsQuery && savedSessionsQuery.pubAudienceValue) {
      Array.from(pubAudienceSelect.options).forEach((option, idx) => {
        if (option.value === savedSessionsQuery.pubAudienceValue) {
          pubAudienceSelect.selectedIndex = idx;
        }
      });
    }
    setQuery(
      `+title:* +resourceDate:${pubDateSelect.value} +resourceType:${pubTypeSelect.value} +resourceAudience:${pubAudienceSelect.value} +contentfulType:${contentfulType}`
    );
  };

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    setQuery(`+title:* +resourceDate:* +resourceType:* +resourceAudience:*`);
    document.querySelector('#publicationDate').selectedIndex = 0;
    document.querySelector('#publicationType').selectedIndex = 0;
    document.querySelector('#publicationAudience').selectedIndex = 0;
  };

  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];
    if (location.search) {
      handleUrlParams();
    } else {
      matchFiltersToSessions();
    }
    const searchResults = lunrIndex.index.search(query);
    setResults(
      searchResults.map(({ ref }) => {
        return lunrIndex.store[ref];
      })
    );
    console.log(results);
  }, [query, location]);

  return (
    <>
      <Layout>
        <>
          <div className="p-10 pt-0 pb-0">
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
          <GridCards items={results} listType="resources" />
        </>
      </Layout>
    </>
  );
};

export default Search;
