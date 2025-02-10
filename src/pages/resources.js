import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';
import GridCards from '../components/GridCards';
const sessionsName = 'resource-filters';

const Search = ({ location }) => {
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

  const formatQuery = ({
    resourceDate = '',
    resourceType = '',
    resourceAudience = '',
    contentfulType = '',
  }) => {
    let resourceDateQuery = resourceDate && resourceDate !== '*' ? `+resourceDate:${resourceDate}` : '';
    let resourceTypeQuery =
      resourceType && resourceType !== '*'
        ? `+resourceType:${resourceType.split(' ').join(' +')}`
        : '';
    let resourceAudienceQuery = resourceAudience && resourceAudience !== '*' ? `+resourceAudience:${resourceAudience}` : '';
    let contentfulTypeQuery = `+contentfulType:${contentfulType}`;

    return `
      ${resourceDateQuery}
      ${resourceTypeQuery}
      ${resourceAudienceQuery}
      ${contentfulTypeQuery}
    `;
  };

  const handleSearchQuery = () => {
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

    const formattedQuery = formatQuery({
      resourceDate: pubDateValue,
      resourceType: pubTypeValue,
      resourceAudience: formatAudienceQuery(pubAudienceValue),
      contentfulType,
    });

    setQuery(formattedQuery);
  };

  const handleUrlParams = useCallback(() => {
    let pubDateParam = new URLSearchParams(location.search).get('year') || '*';
    let pubTypeParam = new URLSearchParams(location.search).get('type') || '*';
    let pubAudienceParam =
      new URLSearchParams(location.search).get('audience') || '*';

    setPubDateQuery(pubDateParam);
    setPubTypeQuery(capFirstLet(pubTypeParam));
    setPubAudienceQuery(capFirstLet(pubAudienceParam));

    const formattedQuery = formatQuery({
      resourceDate: pubDateParam,
      resourceType: pubTypeParam,
      resourceAudience: formatAudienceQuery(pubAudienceParam),
      contentfulType,
    });

    setQuery(formattedQuery);
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

    const formattedQuery = formatQuery({
      title: '*',
      resourceDate: pubDateSelect.value,
      resourceType: pubTypeSelect.value,
      resourceAudience: formatAudienceQuery(pubAudienceSelect.value),
      contentfulType,
    });

    setQuery(formattedQuery);
  }, []);

  const clearFilters = () => {
    sessionStorage.removeItem(sessionsName);
    document.querySelector('#publicationDate').selectedIndex = 0;
    document.querySelector('#publicationType').selectedIndex = 0;
    document.querySelector('#publicationAudience').selectedIndex = 0;
    location.search = '';

    setQuery(
      formatQuery({
        resourceDate: '*',
        resourceType: '*',
        resourceAudience: '*',
        contentfulType: contentfulType
      }));
  };

  // const sortResultsByReportDateDesc = results => {
  //   return results.sort(
  //     (a, b) => new Date(b.resourceDate) - new Date(a.resourceDate)
  //   );
  // };

  const sortResults = results => {
    return results.sort((a, b) => {
      // Prioritize OSHWA first
      const originOrder = (b.origin === 'OSHWA') - (a.origin === 'OSHWA');
      if (originOrder !== 0) return originOrder;

      return a.title.localeCompare(b.title);
    });
  };

  useEffect(() => {
    const lunrIndex = window.__LUNR__['en'];

    handleUrlParams();
    matchFiltersToSessions();
    const searchResults = lunrIndex.index.search(query);

    const searchResultsMapped = searchResults.map(({ ref }) => {
      return lunrIndex.store[ref];
    });
    setResults(sortResults(searchResultsMapped));
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
