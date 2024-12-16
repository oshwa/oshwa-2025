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
            headerImage {
              url
            }
            shortDescription {
              shortDescription
              childrenMarkdownRemark {
                html
              }
            }
            programs {
              id
              title
              prettyUrl
            }
          }
        }
      }
    }
  `);

  const pageData = data.allContentfulProgramsPage.edges[0].node;

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        description={pageData.shortDescription.childrenMarkdownRemark[0].html}
        headerImageUrl={pageData.headerImage.url}
      />
      <GridCards
        items={pageData.programs}
        pageLocation="programs"
        page="programs-page"
      />
    </Layout>
  );
};

export default ProgramsPage;
