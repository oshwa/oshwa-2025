import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import GridCards from '../components/GridCardsB';

const ProgramsPage = () => {
  const data = useStaticQuery(graphql`
    query ProgramsPageQuery {
      allContentfulProgramsPage {
        edges {
          node {
            title
            shortDescription {
              shortDescription
            }
            programs {
              title
              id
            }
          }
        }
      }
    }
  `)

  const pageData = data.allContentfulProgramsPage.edges[0].node;

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        description={pageData.shortDescription.shortDescription}
        headerImageUrl={'https://placehold.jp/800x500.png'}
      />
      <GridCards
        items={pageData.programs}
        pageLocation="programs"
      />
    </Layout>
  )
};

export default ProgramsPage;