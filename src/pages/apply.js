import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

import { OshwaCertifyForm } from '../components/OshwaCertifyForm';
import { AltHeader } from '../components/AltHeader';

const ApplyPage = () => {
  return (
    <>
      <Layout>
        <AltHeader
          title={'Certify a Project'}
          description={
            'Vivamus pharetra imperdiet elementum. Donec pharetra ac arcu at placerat. Proin vel vestibulum ex. Maecenas porttitor nulla sed erat commodo blandit. Vestibulum pharetra velit non porta ullamcorper. Quisque maximus tempus metus, vel commodo massa volutpat sed. Phasellus aliquam ac justo eget vehicula. In efficitur convallis vestibulum. Aenean ut purus vitae sapien vulputate bibendum volutpat eget quam. Phasellus eget fermentum nibh, a fermentum elit.'
          }
          headerImageUrl={'https://placehold.co/600x400'}
        />
        <div className="px-8 pb-5">
          <OshwaCertifyForm />
        </div>
      </Layout>
    </>
  );
};

export const Head = () => (
  <Seo
    title="Certify"
    description="The Open Source Hardware Association (OSHWA) aims to foster technological knowledge and encourage research that is accessible, collaborative and respects user freedom."
  />
);

export default ApplyPage;
