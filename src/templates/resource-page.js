import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default function ResourcePage({ data }) {
  const resource = data.contentfulProduct;
  console.log(resource);
  return (
    <Layout>
      <>
        <div className="p-8">
          <div className="p-4">
            
            <h1>{resource.title}</h1>
            
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
    }
  }
`;
