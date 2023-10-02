import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';

export default function ProjectPage({ data }) {
  const pageData = data.contentfulGenericPage;
  
  return (
    <Layout>
      <>
        <div className="p-8">
          <div className="p-4">
            <h1>{pageData.title}</h1>
          </div>
        </div>
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
    }
  }
`;
