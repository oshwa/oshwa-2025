import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { SidebarGallery } from '../components/SidebarGallery';
import RichText from '../components/RichText';
import Seo from "../components/seo";

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query notFoundQuery {
      allContentfulGenericPage(filter: {title: {eq: "404"}}) {
        edges {
          node {
            id
            title
            prettyUrl
            seoDescription
            shortDescription {
              childMarkdownRemark {
                html
              }
            }
            headerImage {
              url
            }
            body {
              raw
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
      }
    }
  `);

  const pageData = data.allContentfulGenericPage.edges[0].node;

  return (
    <Layout>
      <>
        <GenericHeader
          title={pageData.title}
          description={pageData.shortDescription.childMarkdownRemark.html}
          headerImageUrl={pageData.headerImage ? pageData.headerImage.url : null}
        />

        <div className="px-8 mt-8 pb-5 generic-container">
          <div className="grid grid-cols-8 lg:grid-cols-6">
            <div className="col-span-10 lg:col-span-4 content-container">
              {pageData.body && (
                <RichText content={pageData.body} />
              )}
            </div>

            {pageData.sidebarGallery && (
              <SidebarGallery data={pageData.sidebarGallery} />
            )}
          </div>
        </div>
      </>
    </Layout>
  )
};

export const Head = () => <Seo title="404" />

export default NotFoundPage;
