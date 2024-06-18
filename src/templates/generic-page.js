import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { PeopleTemplate } from '../components/People';
import { EventsTemplate } from '../components/Events';
import MarkdownText from '../components/MarkdownText';

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

        {pageData.title === "Team" && (
          <PeopleTemplate />
        )}

        {pageData.title === "Events" && (
          <EventsTemplate />
        )}

        {(pageData.title !== "Events" || pageData.title !== "Team") && (
          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-header">
            <div className="resource-header__title-wrapper col-span-3">

              {pageData.body && (
                <MarkdownText content={pageData.body.internal.content} />
              )}

            </div>
            <div className="resource-header__image col-span-2 col-start-5">
              side column
            </div>
          </div>
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
      body {
        internal {
          content
        }
      }
    }
  }
`;
