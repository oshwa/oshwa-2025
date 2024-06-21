import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';

import { ArrowLink } from '../components/Link';

import Map from '../components/Map';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      contentfulIndex {
        id
        title
      }
      allOshwaCertifications {
        totalCount
      }
    }
  `);

  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-5 md:grid-cols-5 xs:pb-5">
            <div className="col-span-3 lg:mr-5 md:mr-5 h-full notched notched--bg index-banner mb-20 md:mb-0">
              <div className="index-image-container">
                <StaticImage
                  className="main-logo"
                  src="../images/lockup-color.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
                <ArrowLink text="About OSHWA" location="/about" />
              </div>
            </div>
            <div className="lg:col-span-2 md:col-span-2 h-full notched notched--border notched--border--hover-x featured-box xs:col-span-3 sm:col-span-3 xs:mt-5 sm:mt-5">
              <div className="featured-box__header">
                {/* <p className="featured-box__date">
                  {data.contentfulIndex.featuredResearch.publicationDate}
                </p> */}
                {/* <h2 className="featured-box__title">
                  {data.contentfulIndex.featuredResearch.title}
                </h2> */}
              </div>
              <div className="featured-box__body">
                {/* <p className="featured-box__description">
                  {data.contentfulIndex.featuredResearch.shortDescription}
                </p> */}
                <ArrowLink
                  text="About OSHWA"
                  location="/about"
                  variant={'inverted'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-4 md:grid-cols-3">
            <div className="lg:col-span-1 md:col-span-1 lg:mr-5 md:mr-5 mb-5 md:mb-0 xs:mt-0 sm:mt-5 notched notched--bg yellow project-highlight">
              <div>
                <p className="project-highlight__count">
                  {data.allOshwaCertifications.totalCount}
                </p>
                <p className="project-highlight__text">
                  Certified Open Source Hardware Projects
                </p>
              </div>
              <ArrowLink text="All Certified Projects" location="/projects" />
            </div>

            <div className="lg:col-span-3 md:col-span-2 h-full notched notched--border map-container">
              <Map />
            </div>
          </div>
        </div>

        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-4 md:grid-cols-4">
            <Link to="/programs">
              <div className="section-card lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 mb-5 md:mb-0 notched notched--bg notched--bg--hover-x green">
                <h3 className="section-card__title">Programs</h3>
                <>
                  <StaticImage
                    className="section-card__image image-theme--dark"
                    src="../images/icon-programs.svg"
                    alt="Temp Oshwa Logo"
                    placeholder="none"
                  />
                  <StaticImage
                    className="section-card__image image-theme--light"
                    src="../images/icon-programs-white.svg"
                    alt="Temp Oshwa Logo"
                    placeholder="none"
                  />
                </>
              </div>
            </Link>
            <Link to="/resources">
              <div className="section-card lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 mb-5 md:mb-0 notched notched--bg blue">
                <h3 className="section-card__title">Resources</h3>
                <StaticImage
                  className="section-card__image image-theme--dark"
                  src="../images/icon-resources.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
                <StaticImage
                  className="section-card__image image-theme--light"
                  src="../images/icon-resources-white.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
              </div>
            </Link>
            <Link to="/events">
              <div className="section-card lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 mb-5 md:mb-0 notched notched--bg red">
                <h3 className="section-card__title">Events</h3>
                <StaticImage
                  className="section-card__image image-theme--dark"
                  src="../images/icon-events.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
                <StaticImage
                  className="section-card__image image-theme--light"
                  src="../images/icon-events-white.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
              </div>
            </Link>
            <Link to="/community">
              <div className="section-card lg:col-span-1 md:col-span-2 notched notched--bg orange">
                <h3 className="section-card__title">Community</h3>
                <StaticImage
                  className="section-card__image image-theme--dark"
                  src="../images/icon-community.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
                <StaticImage
                  className="section-card__image image-theme--light"
                  src="../images/icon-community-white.svg"
                  alt="Temp Oshwa Logo"
                  placeholder="none"
                />
              </div>
            </Link>
          </div>
        </div>
      </>
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
