import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { PersonContainer } from '../components/PersonContainer';
import GridCards from '../components/GridCards';
import { NotchedButtonLink } from '../components/Link';
import MarkdownText from '../components/MarkdownText';
import Seo from '../components/seo';

const ProgramYear = ({ data }) => {
  const pageData = data.contentfulProgramYear;
  const image = pageData.headerImage === null ? '' : pageData.headerImage.url;
  const description =
    pageData.shortDescription != null
      ? pageData.shortDescription.childrenMarkdownRemark[0].html
      : '';
  const program = pageData.program != null ? pageData.program[0].title : '';
  const defaultFeaturedWork = pageData.featuredWork && pageData.featuredWork.translatedResources.filter(
    resource => resource.language === 'English'
  )[0];

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        description={description}
        headerImageUrl={image}
        program={program}
      />
      {pageData.fellows && (
        <div className="p-8">
          <h2 className="generic-heading-2 py-8">Fellows</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
            {pageData.fellows.map(fellow => {
              return (
                <Link
                  key={fellow.id}
                  className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover fellow-container"
                  to={`/team/${fellow.prettyUrl}`}
                >
                  <PersonContainer
                    name={fellow.displayName}
                    title={fellow.title}
                    affiliation={fellow.affiliation}
                    profileImageUrl={fellow.image ? fellow.image.url : null}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {pageData.featuredWork != null && defaultFeaturedWork && (
        <div className="p-8 featured-work">
          <div className="grid lg:grid-cols-7 md:grid-cols-1">
            <div className="lg:col-span-2 md:col-span-1 featured-work__img">
              <GatsbyImage
                image={getImage(pageData.featuredWork.resourceImage)}
                alt={pageData.featuredWork.resourceTitle + ` image`}
              />
              <NotchedButtonLink
                external
                text={defaultFeaturedWork.buttonText}
                location={defaultFeaturedWork.buttonUrl}
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-4 md:col-span-1">
              <h3>{defaultFeaturedWork.title}</h3>
              <h4>{defaultFeaturedWork.subtitle}</h4>
              <MarkdownText
                content={
                  defaultFeaturedWork.shortDescription.childrenMarkdownRemark[0]
                    .html
                }
              />
            </div>
          </div>
        </div>
      )}

      {pageData.works && (
        <div className="p-8">
          <h2 className="generic-heading-2 py-8">
            {pageData.worksSectionTitle}
          </h2>
          <GridCards items={pageData.works} listType="resources-ref" />
        </div>
      )}

      {pageData.mentors && (
        <div className="p-10 pt-0 pb-5">
          <h2 className="generic-heading-2 py-8">
            {pageData.mentorsSectionTitle}
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
            {pageData.mentors.map((mentor, idx) => {
              return (
                <Link
                  key={`${mentor.id}-${idx}`}
                  className="lg:col-span-1 md:col-span-2 notched notched--border"
                  to={`/team/${mentor.prettyUrl}`}
                >
                  <PersonContainer
                    name={mentor.displayName}
                    title={mentor.title}
                    affiliation={mentor.affiliation}
                    profileImageUrl={mentor.image.url}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export const Head = ({ data }) => <Seo title={data.contentfulProgramYear.title} />

export default ProgramYear;

export const query = graphql`
  query ($id: String!) {
    contentfulProgramYear(id: { eq: $id }) {
      id
      title
      program {
        id
        title
        prettyUrl
      }
      shortDescription {
        childrenMarkdownRemark {
          html
        }
      }
      headerImage {
        url
      }
      fellows {
        id
        displayName
        prettyUrl
        title
        affiliation
        image {
          url
        }
      }
      mentorsSectionTitle
      mentors {
        displayName
        prettyUrl
        title
        affiliation
        image {
          url
        }
      }
      featuredWork {
        resourceTitle
        prettyUrl
        translatedResources {
          title
          subtitle
          language
          shortDescription {
            childrenMarkdownRemark {
              html
            }
          }
          buttonText
          buttonUrl
        }
        resourceImage {
          gatsbyImage(width: 600)
        }
      }
      worksSectionTitle
      works {
        id
        prettyUrl
        resourceTitle
        resourceType
      }
    }
  }
`;
