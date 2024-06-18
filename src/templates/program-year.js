import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { PersonContainer } from '../components/PersonContainer';
import GridCards from '../components/GridCards';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { NotchedButtonLink } from '../components/Link';

const ProgramYear = ({ data }) => {
  const pageData = data.contentfulProgramYear;
  const description = (pageData.shortDescription === null) ? '' : pageData.shortDescription.shortDescription;
  const image = (pageData.headerImage === null) ? '' : pageData.headerImage.url;

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        description={description}
        headerImageUrl={image}
        program={pageData.program[0].title}
      />
      {pageData.fellows && (
        <div className="p-10 pt-0 pb-5">
          <h2 className="generic-heading-2 py-8">Fellows</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4">
            {pageData.fellows.map(fellow => {
              return (
                <Link
                  key={fellow.id}
                  className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                  to={`/people/${fellow.prettyUrl}`}
                >
                  <PersonContainer
                    name={fellow.displayName}
                    title={fellow.title}
                    profileImageUrl={fellow.image.url}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {pageData.featuredWork && (
        <div className="p-10 pt-0 pb-5 featured-work">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12">
            <div className="col-span-1 md:col-span-1 lg:col-span-3 featured-work__img">
              <GatsbyImage
                image={getImage(pageData.featuredWork.resourceImage)}
                alt={pageData.featuredWork.title + ` image`}
              />
              <NotchedButtonLink text={pageData.featuredWork.buttonText} location={pageData.featuredWork.buttonUrl} />
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-7 lg:col-start-5">
              <h3>{pageData.featuredWork.title}</h3>
              <h4>{pageData.featuredWork.subtitle}</h4>
              <p>{pageData.featuredWork.shortDescription.shortDescription}</p>
            </div>
          </div>
        </div>
      )}

      {pageData.works && (
        <div className="p-10 pt-0 pb-5">
          <h2 className="generic-heading-2 py-8">{pageData.worksSectionTitle}</h2>
          <GridCards items={pageData.works} listType="resources-ref" />
        </div>
      )}

      {
        pageData.mentors && (
          <div className="p-10 pt-0 pb-5">
            <h2 className="generic-heading-2 py-8">{pageData.mentorsSectionTitle}</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4">
              {pageData.mentors.map(mentor => {
                return (
                  <Link
                    key={mentor.id}
                    className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                    to={`/people/${mentor.prettyUrl}`}
                  >
                    <PersonContainer
                      name={mentor.displayName}
                      title={mentor.title}
                      profileImageUrl={mentor.image.url}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )
      }
    </Layout >
  )
};

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
        shortDescription
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
        title
        subtitle
        shortDescription {
          shortDescription
        }
        resourceImage {
          gatsbyImage(width: 600)
        }
        buttonUrl
        buttonText
      }
      worksSectionTitle
      works {
        id
        title

      }
    }
  }
`;
