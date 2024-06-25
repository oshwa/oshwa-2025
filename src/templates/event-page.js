import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { GenericHeader } from '../components/GenericHeader';
import { NotchedButtonLink } from '../components/Link';
import RichText from '../components/RichText';

const Event = ({ data }) => {
  const pageData = data.contentfulEvent;
  const image = (pageData.headerImage === null) ? '' : pageData.headerImage.url;
  const dates = `${pageData.dateStart} - ${pageData.dateEnd}`

  return (
    <Layout>
      <GenericHeader
        title={pageData.title}
        location={pageData.location}
        headerImageUrl={image}
        program={dates}
      />

      <div className="px-8 event-body">
        <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4">
          <div className="lg:col-span-3 md:col-span-5 ">
            {pageData.body && (
              <RichText content={pageData.body} />
            )}
          </div>
          <div className="lg:col-span-2 md:col-span-5">
            <div className="event-btn-links">
              {/* {pageData.eventUrl && ( */}
              <NotchedButtonLink text="EVENT WEBSITE" location={pageData.eventUrl} />
              {/* )} */}
              <NotchedButtonLink text="SUMMIT FELLOWS" location="/" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Event;

export const query = graphql`
  query ($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      id
      title
      fields { slug }
      dateStart: dateStart(formatString: "MMMM DD, YYYY")
      dateEnd: dateEnd(formatString: "MMMM DD, YYYY")
      location
      eventUrl
      headerImage { 
        url 
      }
      body {
        raw
      }
    }
  }
`;

