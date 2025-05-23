import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { PersonContainer } from '../components/PersonContainer';

export const PeopleTemplate = () => {
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
      communityAlumni: allContentfulPeople(
        filter: { type: { eq: "OSHWA Community Alumni" } }
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
            externalUrl
            title
            affiliation
            type
          }
        }
      }
    }
  `);

  return (
    <>
      <div className="px-8 pb-5">
        {data.teamMembers && (
          <>
            <h2 className="generic-heading-2 py-8">Team</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {data.teamMembers.edges.map(teamMember => {
                return (
                  <Link
                    key={teamMember.node.id}
                    className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover"
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
            </div>
          </>
        )}

        {data.boardMembers && (
          <>
            <h2 className="generic-heading-2 generic-heading-2--2nd-heading py-8">
              Board Members
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {data.boardMembers.edges.map(boardMember => {
                return (
                  <Link
                    key={boardMember.node.id}
                    className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover"
                    to={boardMember.node.prettyUrl}
                  >
                    <PersonContainer
                      name={boardMember.node.displayName}
                      title={boardMember.node.title}
                      affiliation={boardMember.node.affiliation}
                      profileImageUrl={boardMember.node.image.file.url}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {data.communityAlumni && (
          <>
            <h2 className="generic-heading-2 generic-heading-2--2nd-heading py-8">
              OSHWA Community Alumni
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {data.communityAlumni.edges.map(alum => {
                let profileCard = alum.node.externalUrl ? (
                  <a
                    key={alum.node.id}
                    className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover community-alumni"
                    href={alum.node.externalUrl}
                  >
                    <PersonContainer
                      name={alum.node.displayName}
                      title={alum.node.title}
                      affiliation={alum.node.affiliation}
                    />
                  </a>
                ) : (
                  <div
                    key={alum.node.id}
                    className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover community-alumni"
                    href={alum.node.externalUrl}
                  >
                    <PersonContainer
                      name={alum.node.displayName}
                      title={alum.node.title}
                      affiliation={alum.node.affiliation}
                    />
                  </div>
                );
                return profileCard;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
