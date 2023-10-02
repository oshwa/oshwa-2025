import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';

export default function ProjectsPage() {
  const data = useStaticQuery(graphql`
    query allCertificationsQuery {
      allOshwaCertifications {
        edges {
          node {
            id
            oshwaUid
            projectName
            projectWebsite
            projectDescription
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <>
        <div className="p-8">
          <div className="grid lg:grid-cols-4">
            {data.allOshwaCertifications.edges.map(project => (
              <Link to={`${project.node.id.toLowerCase()}`}>
                <div className="p-4 col-span-1 flex flex-col justify-left">
                  <p className="block text-xs">{project.node.oshwaUid}</p>
                  <h2 className="text-2xl">{project.node.projectName}</h2>
                  <p>{project.node.projectDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
}
