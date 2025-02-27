import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import GridCards from '../components/GridCardsB';
import Seo from '../components/seo';

const Programs = ({ data }) => {
  const pageData = data.contentfulProgram;

  return (
    <Layout>

      <GenericHeader
        title={pageData.title}
        description={pageData.shortDescription.childrenMarkdownRemark[0].html}
        headerImageUrl={pageData.headerImage.gatsbyImageData.images.fallback.src}
      />
      <GridCards
        items={pageData.programYears}
        pageLocation={`programs/${pageData.programYears[0].fields.slugProgram}`}
      />
    </Layout>
  )
};

export const Head = ({ data }) => <Seo title={data.contentfulProgram.title} />

export default Programs;

export const query = graphql`
  query ($id: String!) {
    contentfulProgram(id: { eq: $id }) {
      id
      title
      shortDescription {
        shortDescription
         childrenMarkdownRemark {
          html
        }
      }
      programYears {
        title
        fields {
          slugProgram
        }
      }
      headerImage {
        url
        gatsbyImageData
      }
    }
  }
`;
