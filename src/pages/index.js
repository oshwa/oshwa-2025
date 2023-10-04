import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import Layout from '../components/layout';
import Main from '../components/Main';
import Seo from '../components/seo';

const IndexPage = () => (
  <Layout>
    <>
      <div className="p-8 pt-0 pb-5">
        <div className="grid lg:grid-cols-5 md:grid-cols-5">
          <div className="col-span-3 lg:mr-5 md:mr-5 notched notched--bg">
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
          <div className="col-span-2 h-full notched notched--border notched--border--hover">
            <p>col 2</p>
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
        <div className="grid lg:grid-cols-4 md:grid-cols-3">
          <div className="lg:col-span-1 md:col-span-1 lg:mr-5 md:mr-5 notched notched--bg yellow">
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

          <div className="lg:col-span-3 md:col-span-2 h-full notched notched--border">
          </div>
        </div>
      </div>

      <div className="p-8 pt-0 pb-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-4">
          <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--bg notched--bg--hover green" to="/programs">
            Programs
          </Link>
          <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 notched notched--bg blue" to="/resources">
            Resources
          </Link>
          <Link className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--bg red" to="/events">
            <h3>Events</h3>
          </Link>
          <Link className="lg:col-span-1 md:col-span-2 notched notched--bg orange" to="/community">
            <h3>Community</h3>
          </Link>
        </div>
      </div>
    </>
  </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
