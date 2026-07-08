import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { NotchedButtonLink } from '../components/Link';
import { GenericHeader } from '../components/GenericHeader';

const Confirmation = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="generic-heading-1">Confirmation</h1>
      </div>
      <div className="p-8">
        <p>
          Your application is now under review by the OSHWA team. In most cases
          this review is completed in less than two weeks. Once it is complete
          you will be notified at the email address you provided in your
          application. If the team has questions they will reach out to you
          directly at the same email address. In the meantime, if you have any
          questions or concerns, please do not hesitate to contact us at{' '}
          <a href="mailto:certification@oshwa.org">certification@oshwa.org</a>.
        </p>
      </div>
      <div className="px-8">
        <div className="p-4 w-full flex justify-center">
          <div className="w-1/2">
            <NotchedButtonLink
              text="Submit another project"
              location="/apply"
            />
          </div>
        </div>
        <div className="p-4 w-full flex justify-center">
          <div className="w-1/2">
            <NotchedButtonLink text="Go back to the homepage" location="/" />
          </div>
        </div>
        <div className="p-4 w-full flex justify-center">
          <div className="w-1/2">
            <NotchedButtonLink
              external
              text="Donate"
              location="https://secure.lglforms.com/form_engine/s/SpkKq95XVPOuQ2d-UNFtXQ"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <Seo
    title="Confirmation"
    description="The Open Source Hardware Association (OSHWA) aims to foster technological knowledge and encourage research that is accessible, collaborative and respects user freedom."
  />
);
export default Confirmation;
