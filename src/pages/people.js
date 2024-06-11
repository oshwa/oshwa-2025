import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import { GenericHeader } from '../components/GenericHeader';
import { PersonContainer } from '../components/PersonContainer';

export default function PeopleTemplate() {
  const data = useStaticQuery(graphql`
    query PeoplePageQuery {
      teamMembers: allContentfulPeople(filter: { type: { eq: "OSHWA Team" } }) {
        edges {
          node {
            id
            displayName
            image {
              id
              file {
                url
                fileName
                contentType
              }
            }
            prettyUrl
            title
            affiliation
            type
          }
        }
      }
      boardMembers: allContentfulPeople(
        filter: { type: { eq: "OSHWA Board Members" } }
      ) {
        edges {
          node {
            id
            displayName
            image {
              id
              file {
                url
                fileName
                contentType
              }
            }
            prettyUrl
            title
            affiliation
            type
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <>
        <GenericHeader
          title={'People'}
          headerImageUrl={'https://placehold.jp/800x500.png'}
        />

        <div className="p-10 pt-0 pb-5">
          <h2 className="generic-heading-2 py-8">Team</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4">
            {data.teamMembers.edges.map(teamMember => {
              return (
                <Link
                  key={teamMember.node.id}
                  className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                  to={teamMember.node.prettyUrl}
                >
                  <PersonContainer
                    name={teamMember.node.displayName}
                    title={teamMember.node.title}
                    profileImageUrl={teamMember.node.image.file.url}
                  />
                </Link>
              );
            })}
            {/* <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
              to="/"
            >
              <PersonContainer name={'Person name'} title={'Title'} />
            </Link> */}
            {/* <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 notched notched--border"
              to="/"
            >
              <PersonContainer />
            </Link>
            <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
              to="/"
            >
              <PersonContainer />
            </Link>
            <Link
              className="lg:col-span-1 md:col-span-2 notched notched--border"
              to="/"
            >
              <PersonContainer />
            </Link> */}
          </div>

          <h2 className="generic-heading-2 py-8">Board Members</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4">
            {data.boardMembers.edges.map(boardMember => {
              return (
                <Link
                  key={boardMember.node.id}
                  className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                  to={boardMember.node.prettyUrl}
                >
                  <PersonContainer
                    name={boardMember.node.displayName}
                    title={boardMember.node.title}
                    profileImageUrl={boardMember.node.image.file.url}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </>
    </Layout>
  );
}
