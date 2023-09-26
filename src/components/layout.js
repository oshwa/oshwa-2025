/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import 'normalize.css';
import '../vendor/foundation.min.css';
// import '../vendor/styleguide-v2.1.css';
import '../styles/themes.scss';
import '../styles/styles.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  const navType = `left-push-nav`;

  return (
    <>
      <Header
        navType={navType}
        active={active}
        setActive={setActive}
        handleClick={handleClick}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <Main navType={navType} active={active} setActive={setActive}>
        {children}
      </Main>
      {/* layout one  */}
      <div className="p-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-5">
          <div className="p-4 col-span-3 flex justify-center">
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
          <div className="p-4 col-span-2 justify-center">
            <h2>Headline One</h2>
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

      {/* layout two  */}
      <div className="p-8">
        <div className="grid lg:grid-cols-4">
          <div className="p-4 col-span-1 flex justify-center">
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
          <div className="p-4 col-span-3 justify-center">
            <h2>Headline One</h2>
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

      {/* layout 3 */}
      <div className="p-8">
        <div className="grid lg:grid-cols-4">
          <div className="p-4 col-span-1 flex justify-center">
            <p>
              Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
              tempor sit mollit sint exercitation proident culpa minim Lorem id.
            </p>
          </div>
          <div className="p-4 col-span-1 flex justify-center">
            <p>
              Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
              tempor sit mollit sint exercitation proident culpa minim Lorem id.
            </p>
          </div>

          <div className="p-4 col-span-1 flex justify-center">
            <p>
              Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
              tempor sit mollit sint exercitation proident culpa minim Lorem id.
            </p>
          </div>

          <div className="p-4 col-span-1 flex justify-center">
            <p>
              Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
              tempor sit mollit sint exercitation proident culpa minim Lorem id.
            </p>
          </div>
        </div>
      </div>

      {/* layout four */}
      <div className="p-8">
        <div className="grid lg:grid-cols-8 gap-4">
          <div className="p-4 lg:col-start-1 lg:col-span-2 sm:col-span-8 flex">
            <p>1</p>
          </div>
          <div className="p-4 lg:col-start-6 lg:col-span-3 sm:col-span-8  flex">
            <p>2</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
