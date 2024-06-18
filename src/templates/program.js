import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import GridCards from '../components/GridCardsB';

const Programs = ({ data }) => {
  const pageData = data.contentfulProgram;

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        description={pageData.shortDescription.shortDescription}
        headerImageUrl={pageData.headerImage.gatsbyImageData.images.fallback.src}
      />
      <GridCards
        items={pageData.programYears}
        pageLocation="programs/years"
      />
    </Layout>
  )
};

export default Programs;

export const query = graphql`
  query ($id: String!) {
    contentfulProgram(id: { eq: $id }) {
      id
      title
      shortDescription {
        shortDescription
      }
      programYears {
        title
      }
      headerImage {
        url
        gatsbyImageData
      }
    }
  }
`;
