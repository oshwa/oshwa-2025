import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { PeopleTemplate } from '../components/People';
import { EventsTemplate } from '../components/Events';

export default function ProjectPage({ data }) {
  const pageData = data.contentfulGenericPage;

  return (
    <Layout>
      <>
        <GenericHeader
          title={pageData.title}
          description={pageData.shortDescription.shortDescription}
          headerImageUrl={pageData.headerImage.url}
        />

        {pageData.title === "People" && (
          <PeopleTemplate />
        )}

        {pageData.title === "OSHWA Events" && (
          <EventsTemplate />
        )}
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    contentfulGenericPage(id: { eq: $id }) {
      id
      prettyUrl
      title
      shortDescription {
        shortDescription
      }
      headerImage {
        url
      }
    }
  }
`;
