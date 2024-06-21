import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { NotchedButtonLink } from '../components/Link';
import { Video } from '../components/Video';
import RichText from '../components/RichText';

export default function ProfilePage({ data }) {
  const profile = data.contentfulPeople;
  // const certifications = data.allOshwaCertifications;
  // console.log("certifications", certifications);

  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5">
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

        {profile.featuredResearch && (
          <div className="p-10 pt-0 pb-5">
            <h2 className="generic-heading-2 py-8">Resources</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
              {profile.featuredResearch &&
                profile.featuredResearch.map(resource => {
                  return (
                    <Link
                      key={resource.id}
                      className="col-span-1 mb-5 notched notched--border resource-wrapper"
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

        {/* {!!certifications.edges.length && (
          <div className="p-10 pt-0 pb-5">
            <h2 className="generic-heading-2 py-8">Certifications</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-5">
              {certifications &&
                certifications.edges.map(project => {
                  console.log(project);
                  return (
                    <Link
                      key={project.node.id}
                      className="lg:col-span-1 md:col-span-2 notched notched--border resource-wrapper"
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
        )} */}
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
      relatedResources {
        title
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
