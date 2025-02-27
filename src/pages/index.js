import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import { ArrowLink } from '../components/Link';
import Map from '../components/Map';
import Seo from '../components/seo';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      contentfulIndex {
        id
        title
        featuredPost {
          id
          prettyUrl
          date: date(formatString: "MMMM DD, YYYY")
          title
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
        <div className="px-8 p">
          <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4 ">
            {/* <div className="col-span-3 notched notched--bg index-banner white"> */}
            <div className="col-span-3 notched notched--border notched--border--hover-x index-banner white">
              <div className="index-image-container">
                <StaticImage
                  className="main-logo"
                  src="../images/lockup-color.svg"
                  alt="Open Source Hardware Association logo"
                  placeholder="none"
                />
                <ArrowLink text="About OSHWA" location="/about" variant={'light-inverted'} />
              </div>
            </div>
            <div className="lg:col-span-2 md:col-span-2 notched notched--border notched--border--hover-x featured-box xs:col-span-3 sm:col-span-3">
              <div className="featured-box__header">
                <p className="featured-box__date">
                  {data.contentfulIndex.featuredPost.date}
                </p>
                <h2 className="featured-box__title">
                  {data.contentfulIndex.featuredPost.title}
                </h2>
              </div>
              <div className="featured-box__body">
                <p className="featured-box__description">
                  {data.contentfulIndex.featuredPost.shortDescription}
                </p>
                <ArrowLink
                  text="Read more"
                  location={`/announcements/${data.contentfulIndex.featuredPost.prettyUrl}`}
                  variant={'inverted'}
                />
                <br />
                <ArrowLink
                  text="See all announcements"
                  location={`/announcements`}
                  variant={'inverted'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
            <div className="lg:col-span-1 md:col-span-3 notched notched--bg yellow project-highlight">
              <div>
                <p className="project-highlight__count">
                  {data.allOshwaCertifications.totalCount}
                </p>
                <p className="project-highlight__text">
                  Certified Open Source Hardware Projects
                </p>
              </div>
              <ArrowLink
                external
                text="All Certified Projects"
                location="https://certification.oshwa.org/list.html"
              />
            </div>

            <div className="lg:col-span-3 md:col-span-3 notched notched--border map-container">
              <Map />
            </div>
          </div>
        </div>

        <div className="px-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-4 gap-4">
            <Link to="/programs">
              <div className="section-card section-card--color lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--bg notched--bg--hover green">
                <h3 className="section-card__title">Programs</h3>
                <>
                  <StaticImage
                    className="section-card__image"
                    src="../images/icon-programs.svg"
                    alt="Programs page link logo"
                    placeholder="none"
                  />
                </>
              </div>
            </Link>
            <Link to="/resources">
              <div className="section-card section-card--color lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--bg notched--bg--hover blue">
                <h3 className="section-card__title">Resources</h3>
                <StaticImage
                  className="section-card__image"
                  src="../images/icon-resources.svg"
                  alt="Resources page link logo"
                  placeholder="none"
                />
              </div>
            </Link>
            <Link to="/events">
              <div className="section-card section-card--color lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--bg notched--bg--hover red">
                <h3 className="section-card__title">Events</h3>
                <StaticImage
                  className="section-card__image"
                  src="../images/icon-events.svg"
                  alt="Events page link logo"
                  placeholder="none"
                />
              </div>
            </Link>
            <Link to="/community">
              <div className="section-card section-card--color lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--bg notched--bg--hover orange">
                <h3 className="section-card__title">Community</h3>
                <StaticImage
                  className="section-card__image"
                  src="../images/icon-community.svg"
                  alt="Community page link logo"
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

export const Head = () =>
  <Seo
    title="Home"
    description="The Open Source Hardware Association (OSHWA) aims to foster technological knowledge and encourage research that is accessible, collaborative and respects user freedom."
  />;

export default IndexPage;
