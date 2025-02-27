import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { NotchedButtonLink } from '../components/Link';
import { Video } from '../components/Video';
import RichText from '../components/RichText';

export default function ProfilePage({ data }) {
  const profile = data.contentfulPeople;
  const certifications = data.allOshwaCertifications;

  const getProjectByUid = uid => {
    let allCerts = certifications.edges;
    return allCerts.filter(node => node.node.oshwaUid === uid)[0];
  };

  const certifiedProjects =
    profile.certificationUids &&
    profile.certificationUids.map(projectId => {
      return getProjectByUid(projectId).node;
    });

  return (
    <Layout>
      <>
        <div className="px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 profile-header">
            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              {profile.image && (
                <div
                  className="profile-image h-96 notched notched--bg notched--bg--img"
                  style={{ backgroundImage: `url(${profile.image.url})` }}
                ></div>
              )}
              <div className="links-container">
                {profile.externalUrl && (
                  <NotchedButtonLink
                    text={profile.externalUrlTitle}
                    location={profile.externalUrl}
                    external={true}
                  />
                )}

                {profile.socialUrl && (
                  <NotchedButtonLink
                    text={profile.socialUrlTitle}
                    location={profile.socialUrl}
                    external={true}
                  />
                )}
                {profile.video && (
                  <Video
                    title={profile.videoSectionTitle}
                    resourceTitle={profile.video.resourceTitle}
                    videoId={profile.video.youTubeId}
                    size="large"
                  />
                )}
              </div>
            </div>

            <div className="profile col-span-1 md:col-span-1 lg:col-span-7 lg:col-start-5 notched">
              <div className="profile-info">
                <p className="profile__type">{profile.type}</p>
                <h1 className="generic-heading-1">{profile.displayName}</h1>
                <p className="profile__title">{profile.title}</p>
              </div>
              <div className="py-8">
                {profile.bio && <RichText content={profile.bio} />}
              </div>
            </div>
          </div>
          {profile.video && (
            <Video
              title={profile.videoSectionTitle}
              resourceTitle={profile.video.resourceTitle}
              videoId={profile.video.youTubeId}
              size="medium-small"
            />
          )}
        </div>

        {profile.relatedResources && (
          <div className="p-8">
            <h2 className="generic-heading-2 py-8">Related Resources</h2>
            <div className="list">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                {profile.relatedResources &&
                  profile.relatedResources.map(resource => {
                    return (
                      <Link
                        key={resource.id}
                        to={`/resources/${resource.prettyUrl}`}
                        className="lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--border notched--border--hover "
                      >
                        <div className="profile-resource-card">
                          <p className="title"> {resource.resourceTitle}</p>
                          <p className="type"> {resource.resourceType}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {certifiedProjects && (
          <div className="p-8">
            <h2 className="generic-heading-2 py-8">Certifications</h2>
            <div className="list">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                {certifiedProjects &&
                  certifiedProjects.map(project => {
                    return (
                      <a
                        key={project.id}
                        href={`https://certification.oshwa.org/${project.oshwaUid.toLowerCase()}`}
                        className="lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--border notched--border--hover list-item"
                        aria-label={`View certification for ${project.projectName}`}
                      >
                        <div>
                          <p className="project-id">{project.oshwaUid}</p>
                          <p className="title"> {project.projectName}</p>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {profile.teamMembers && (
          <div className="p-8">
            <h2 className="generic-heading-2 py-8">Team Members</h2>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
              {profile.teamMembers.map(member => {
                let peopleCard = member.externalUrl ? (
                  <a
                    key={member.id}
                    href={member.externalUrl}
                    className="lg:col-span-1 md:col-span-4 sm:col-span-4 list-item notched notched--border"
                    aria-label={`View profile of ${member.displayName}`}
                  >
                    <div
                      key={member.id}
                      className="profile-team-card person-container"
                    >
                      <p className=" person-container__name ">
                        {' '}
                        {member.displayName}
                      </p>
                      <p className="person-container__title"> {member.title}</p>
                      <p className="person-container__affiliation">
                        {member.affiliation}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div
                    key={member.id}
                    className="profile-team-card person-container lg:col-span-1 md:col-span-4 sm:col-span-4 list-item notched notched--border "
                  >
                    <p className=" person-container__name ">
                      {' '}
                      {member.displayName}
                    </p>
                    <p className="person-container__title"> {member.title}</p>
                    <p className="person-container__affiliation">
                      {member.affiliation}
                    </p>
                  </div>
                );
                return peopleCard;
              })}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    contentfulPeople(id: { eq: $id }) {
      id
      prettyUrl
      firstName
      lastName
      displayName
      title
      affiliation
      type
      image {
        url
      }
      bio {
        raw
      }
      externalUrl
      externalUrlTitle
      socialUrl
      socialUrlTitle
      videoSectionTitle
      video {
        id
        resourceTitle
        youTubeId
      }
      certificationUids
      relatedResources {
        id
        resourceTitle
        resourceType
        prettyUrl
      }
      teamMembers {
        id
        displayName
        prettyUrl
        externalUrl
        title
        affiliation
      }
    }
    allOshwaCertifications {
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
