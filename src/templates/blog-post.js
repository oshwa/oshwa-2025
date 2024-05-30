import React from 'react';
import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import RichText from '../components/RichText';
import dayjs from 'dayjs';

export default function BlogPost({ data }) {
  const blogPost = data.contentfulBlogPost;

  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-header">
            <div className="resource-header__title-wrapper col-span-3">
              <p className="resource-header__date">
                {dayjs(blogPost.publicationDate).format('MMMM D, YYYY')}
              </p>
              <h1 className="resource-header__title">{blogPost.title}</h1>
              {blogPost.fullAuthor && (
                <p className="resource-header__named_authors">
                  {blogPost.fullAuthor.fullAuthor}
                </p>
              )}
              <RichText content={blogPost.body} />
            </div>
            <div className="resource-header__image col-span-2 col-start-5">
              side column
            </div>
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
      prettyUrl
      publicationDate
      fullAuthor {
        fullAuthor
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
