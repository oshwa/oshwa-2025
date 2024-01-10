import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import MarkdownText from '../components/MarkdownText';
import FixedNav from '../components/FixedNav';
import RichText from '../components/RichText';

export default function ResourcePage({ data }) {
  const resource = data.contentfulProduct;

  // console.log(resource);
  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-header">
            <div className="resource-header__title-wrapper col-span-3">
              <h1 className="resource-header__title">{resource.title}</h1>
              <p className="resource-header__named_authors">
                {resource.fullAuthor.fullAuthor}
              </p>
              <p className="resource-introduction">
                {resource.introduction.introduction}{' '}
              </p>
            </div>
            <div className="resource-header__image col-span-2 col-start-5">
              <GatsbyImage
                image={getImage(resource.headerImage)}
                alt="blog image"
              />
              <a href={resource.buttonUrl} className="button button--notched">{resource.buttonText}</a>
            </div>
          </div>
        </div>

        {/* {% if page.fixed_nav %}
            {% include components/fixed-nav.html %}
          {% endif %} */}
        {resource.fixedNav && (
          <FixedNav
            toc={
              resource.markdownBody.childrenMarkdownRemark[0].tableOfContents
            }
          />
        )}

        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-body">
            <div className="col-span-3">
              {resource.body ?
                <RichText content={resource.body} /> :
                <MarkdownText
                  content={resource.markdownBody.childrenMarkdownRemark[0].html}
                />
              }
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    contentfulProduct(id: { eq: $id }) {
      id
      title
      fullAuthor {
        fullAuthor
      }
      buttonText
      buttonUrl
      headerImage {
        id
        gatsbyImage(width: 600)
      }
      introduction {
        introduction
      }
      markdownBody {
        id
        childrenMarkdownRemark {
          id
          html
          tableOfContents
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            description
            url
          }
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
      prettyUrl
      fixedNav
      noIndex
      type
      publicationDate
      people {
        id
        displayName
        prettyUrl
      }
    },
  }
`;
