import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { NotchedButtonLink } from '../components/Link';

export default function ProfilePage({ data }) {
  const profile = data.contentfulPeople;
  const certifications = data.allOshwaCertifications;
  console.log(certifications);
  return (
    <Layout>
      <>
        <div className="p-8 pt-0 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12  profile-header">
            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <div
                className="profile-image md:h-80 lg:h-80 h-60 notched notched--bg notched--bg--img"
                style={{ backgroundImage: `url(${profile.photo.file.url})` }}
              ></div>
              <div className="links-container">
                {profile.buttonUrl && (
                  <NotchedButtonLink
                    text={profile.buttonText}
                    location={profile.buttonUrl}
                    external={true}
                  />
                )}
                {profile.twitter && (
                  <NotchedButtonLink
                    text="Twitter"
                    location={profile.twitter}
                    external={true}
                  />
                )}
              </div>
            </div>
            <div className="profile col-span-1 md:col-span-1 lg:col-span-7 lg:col-start-5 notched">
              <div className="profile-info">
                <p className="profile__type">OSHWA {profile.type}</p>
                <h1 className="generic-heading-1">{profile.displayName}</h1>
                <p className="profile__title">{profile.title}</p>
              </div>
              <p className="py-8">
                Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
                tempor sit mollit sint exercitation proident culpa minim Lorem
                id. Dolore velit sit sunt deserunt duis. Laboris eu irure
                cupidatat minim eu anim. Tempor excepteur sit nulla quis commodo
                do anim non aliquip ea in magna reprehenderit consectetur. Magna
                est officia duis consequat esse tempor velit aute ad laborum
                consectetur eu mollit occaecat. Excepteur ipsum ut ea ipsum
                excepteur cupidatat ea nisi occaecat Lorem eu. Qui occaecat qui
                do incididunt non amet do deserunt reprehenderit. Aute minim
                elit elit veniam anim elit do enim anim consectetur labore
                eiusmod.
              </p>
            </div>
          </div>
        </div>
        {profile.featuredResearch && (
          <div className="p-8  pt-0 pb-5">
            <h2 className="generic-heading-2 py-8">Resources</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4">
              {profile.featuredResearch &&
                profile.featuredResearch.map(resource => {
                  return (
                    <Link
                      key={resource.id}
                      className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border resource-wrapper"
                      to={resource.prettyUrl}
                    >
                      <div className="resource">
                        <h3>{resource.title}</h3>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}

        {!!certifications.edges.length && (
          <div className="p-8  pt-0 pb-5">
            <h2 className="generic-heading-2 py-8">Certifications</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4">
              {certifications &&
                certifications.edges.map(project => {
                  console.log(project);
                  return (
                    <Link
                      key={project.node.id}
                      className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border resource-wrapper"
                      to={`/projects/${project.node.oshwaUid.toLowerCase()}`}
                    >
                      <div className="profile-certification">
                        <p className="profile-certifications__uid">
                          {project.node.oshwaUid}
                        </p>
                        <h3>{project.node.projectName}</h3>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!, $email: String!) {
    contentfulPeople(id: { eq: $id }) {
      displayName
      email
      longDescription {
        longDescription
      }
      photo {
        file {
          url
          fileName
        }
        title
      }
      title
      twitter
      type
      buttonText
      buttonUrl
      featuredResearch {
        id
        title
        prettyUrl
      }
    }
    allOshwaCertifications(filter: { publicContact: { eq: $email } }) {
      edges {
        node {
          id
          oshwaUid
          projectName
        }
      }
    }
  }
`;
