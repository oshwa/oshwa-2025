import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { PeopleTemplate } from '../components/People';
import { EventsTemplate } from '../components/Events';
import MarkdownText from '../components/MarkdownText';
import { SidebarGallery } from '../components/SidebarGallery';

export default function ProjectPage({ data }) {
  const pageData = data.contentfulGenericPage;

  return (
    <Layout>
      <>
        <GenericHeader
          title={pageData.title}
          description={pageData.shortDescription.childMarkdownRemark.html}
          headerImageUrl={pageData.headerImage.url}
        />

        {pageData.title === "Team" && (
          <PeopleTemplate />
        )}

        {pageData.title === "Events" && (
          <EventsTemplate />
        )}

        {(pageData.title !== "Events" || pageData.title !== "Team") && (
          <div className="px-8 pb-5 generic-container">
            <div className="grid grid-cols-8 lg:grid-cols-6">
              <div className="col-span-10 lg:col-span-4 content-container">
                {pageData.body && (
                  <MarkdownText content={pageData.body.childMarkdownRemark.html} />
                )}
              </div>

              {pageData.sidebarGallery && (
                <SidebarGallery data={pageData.sidebarGallery} />
              )}
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
        childMarkdownRemark {
           html
        }
      }
      headerImage {
        url
      }
      body {
        childMarkdownRemark {
           html
        }
      }
      sidebarGallery {
        id
        title
        caption {
          childMarkdownRemark {
            html
          }
        }
        image {
          url
          title
          description
        }
      }
    }
  }
`;
