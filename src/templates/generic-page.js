import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

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
          description={pageData.shortDescription.childrenMarkdownRemark[0].html}
          headerImageUrl={pageData.headerImage.url}
        />

        {pageData.title === "Team" && (
          <PeopleTemplate />
        )}

        {pageData.title === "Events" && (
          <EventsTemplate />
        )}

        {(pageData.title !== "Events" || pageData.title !== "Team") && (
          <div className="p-10 pt-0 pb-5 generic-container">
            <div className="grid grid-cols-8 lg:grid-cols-6">
              <div className="col-span-10 lg:col-span-3">
                {pageData.body && (
                  <MarkdownText content={pageData.body.childrenMarkdownRemark[0].html} />
                )}
              </div>

              {pageData.sidebarGallery && (
                <div className="col-span-8 lg:col-span-2 lg:col-start-5 sidebar-image">
                  {pageData.sidebarGallery.map(sidebarImage => {
                    return (
                      <div
                        key={sidebarImage.id}
                        className="sidebar-image__container"
                      >
                        <GatsbyImage
                          image={getImage(sidebarImage)}
                          alt="sidebar image"
                        />
                        <p className="sidebar-image__description">{sidebarImage.description}</p>
                      </div>
                    )
                  })}
                </div>
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
        childrenMarkdownRemark {
           html
        }
      }
      headerImage {
        url
      }
      body {
        childrenMarkdownRemark {
           html
        }
      }
      sidebarGallery {
        id
        url
        description
        gatsbyImage(width: 600)
      }
    }
  }
`;
