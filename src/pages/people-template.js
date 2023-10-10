import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

import { GenericHeader } from '../components/GenericHeader';
import { PersonContainer } from '../components/PersonContainer';

export default function PeopleTemplate() {
  return (
    <Layout>
      <>
        <GenericHeader title={"People"} />

        <div className="p-8 pt-0 pb-5">
          <h2>H2 heading</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4">
            <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border" to="/">
              <PersonContainer name={"Person name"} title={"Title"} />
            </Link>
            <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 notched notched--border" to="/">
              <PersonContainer />
            </Link>
            <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border" to="/">
              <PersonContainer />
            </Link>
            <Link className="lg:col-span-1 md:col-span-2 notched notched--border" to="/">
              <PersonContainer />
            </Link>
          </div>
        </div>
      </>
    </Layout>
  );
}
