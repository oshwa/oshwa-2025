import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

import { PersonContainer } from '../components/PersonContainer';

export default function PeopleTemplate() {
  return (
    <Layout>
      <>
        <div className="p-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-5 md:grid-cols-5">
            <div className="col-span-3 lg:mr-5 md:mr-5 h-full notched  notched--bg notched--bg--img" style={{ backgroundImage: 'url(https://placehold.jp/800x500.png)' }}></div>
            <div className="col-span-2 h-full notched notched--border">
              <h1>H1 Heading</h1>
              <p>
                Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
                tempor sit mollit sint exercitation proident culpa minim Lorem id.
                Dolore velit sit sunt deserunt duis. Laboris eu irure cupidatat
                minim eu anim. Tempor excepteur sit nulla quis commodo do anim non
                aliquip ea in magna reprehenderit consectetur. Magna est officia
                duis consequat esse tempor velit aute ad laborum consectetur eu
                mollit occaecat. Excepteur ipsum ut ea ipsum excepteur cupidatat
                ea nisi occaecat Lorem eu. Qui occaecat qui do incididunt non amet
                do deserunt reprehenderit. Aute minim elit elit veniam anim elit
                do enim anim consectetur labore eiusmod.
              </p>
            </div>
          </div>
        </div>

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
