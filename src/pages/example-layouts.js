import * as React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = () => (
  <Layout>
    <>
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
