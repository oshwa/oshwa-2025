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
          headerImageUrl={pageData.headerImage ? pageData.headerImage.url : null}
        />

        {pageData.title === "Team" && (
          <PeopleTemplate />
        )}

        {pageData.title === "Events" && (
          <EventsTemplate />
        )}

        {(pageData.title !== "Events" && pageData.title !== "Team") && (
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

        {pageData.relatedResources && (
          <div className="p-8 pb-5">
            <h2 className="generic-heading-2 py-8">{pageData.pinnedTitle}</h2>
            <div className="list">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                {pageData.relatedResources &&
                  pageData.relatedResources.map(resource => {
                    return (
                      <a
                        key={resource.id}
                        href={`/resources/${resource.prettyUrl}`}
                        className="lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--border notched--border--hover list-item"
                      >
                        <p className="title"> {resource.resourceTitle}</p>
                      </a>
                    );
                  })}
              </div>
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
      pinnedTitle
      relatedResources {
        id
        resourceTitle
        prettyUrl
      }
    }
  }
`;
