import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';

import { ArrowLink } from '../components/Link';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      contentfulIndex {
        id
        title
        featuredResearch {
          id
          publicationDate(formatString: "DD MMMM YYYY")
          title
          prettyUrl
          shortDescription
        }
      }
      allOshwaCertifications {
        totalCount
      }
    }
  `);
  return (
    <Layout>
      <>
        <div className="p-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-5 md:grid-cols-5">
            <div className="col-span-3 lg:mr-5 md:mr-5 notched notched--bg index-banner">
              <div className="index-image-container">
                <StaticImage
                  className="temp-index-img"
                  src="../images/example.png"
                  alt="Temp Oshwa Logo"
                />
                <ArrowLink text="About OSHWA" location="/about" />
              </div>
            </div>
            <div className="col-span-2 h-full notched notched--border notched--border--hover featured-box">
              <p className="featured-box__date">
                {data.contentfulIndex.featuredResearch.publicationDate}
              </p>
              <h2 className="featured-box__title">
                {data.contentfulIndex.featuredResearch.title}
              </h2>
              <p>{data.contentfulIndex.featuredResearch.shortDescription}</p>
              <ArrowLink
                text="About OSHWA"
                location="/about"
                variant={'isInverted'}
              />
            </div>
          </div>
        </div>

        <div className="p-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-4 md:grid-cols-3">
            <div className="lg:col-span-1 md:col-span-1 lg:mr-5 md:mr-5 notched notched--bg yellow project-highlight">
              <p className="project-highlight__count">
                {data.allOshwaCertifications.totalCount}
              </p>
              <p className="project-highlight__text">
                Certified Open Source Hardware Projects
              </p>
              <ArrowLink text="All Certified Projects" location="/projects" />
            </div>

            <div className="lg:col-span-3 md:col-span-2 h-full notched notched--border"></div>
          </div>
        </div>

        <div className="p-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-4 md:grid-cols-4 section-card">
            <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--bg notched--bg--hover green"
              to="/programs"
            >
              <h3 className="section-card__title">Programs</h3>
            </Link>
            <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 notched notched--bg blue"
              to="/resources"
            >
              <h3 className="section-card__title">Resources</h3>
            </Link>
            <Link
              className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--bg red"
              to="/events"
            >
              <h3 className="section-card__title">Events</h3>
            </Link>
            <Link
              className="lg:col-span-1 md:col-span-2 notched notched--bg orange"
              to="/community"
            >
              <h3 className="section-card__title">Community</h3>
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
