import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import RichText from '../components/RichText';
import { SidebarGallery } from '../components/SidebarGallery';
import dayjs from 'dayjs';

export default function BlogPost({ data }) {
  const blogPost = data.contentfulBlogPost;

  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5 generic-container">
          <div className="grid grid-cols-8 lg:grid-cols-6">
            <div className="col-span-10 lg:col-span-4 content-container">
              <p className="resource-header__date">
                {dayjs(blogPost.publicationDate).format('MMMM D, YYYY')}
              </p>
              <h1 className="resource-header__title">{blogPost.title}</h1>
              {blogPost.oshwaAuthor && (
                <p className="resource-header__named_authors">
                  {blogPost.oshwaAuthor.displayName}
                </p>
              )}

              {blogPost.body && (
                <RichText content={blogPost.body} />
              )}
            </div>

            {blogPost.sidebarGallery && (
              <SidebarGallery data={blogPost.sidebarGallery} />
            )}
          </div>
        </div>
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      date
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
      oshwaAuthor {
        displayName
      }
      body {
        raw
        references {
          ... on ContentfulFigure {
            contentful_id
            __typename
            id
            title
            image {
              url
              gatsbyImage(width: 900)
            }
            caption {
              caption
              childMarkdownRemark {
                html
              }
            }
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
