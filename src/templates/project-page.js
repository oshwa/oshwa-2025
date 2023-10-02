import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';

export default function ProjectPage({ data }) {
  const project = data.oshwaCertifications;
  console.log(data);
  return (
    <Layout>
      <>
        <div className="p-8">
          <div className="p-4">
            <p>{project.id}</p>
            <h1>{project.projectName}</h1>
            <p>{project.projectDescription}</p>
          </div>
        </div>
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    oshwaCertifications(id: { eq: $id }) {
      id
      oshwaUid
      projectName
      projectWebsite
      projectDescription
    }
  }
`;
