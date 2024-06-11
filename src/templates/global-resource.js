// import React, { useState } from 'react';
// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import Layout from '../components/layout';
// import MarkdownText from '../components/MarkdownText';
// import FixedNav from '../components/FixedNav';
// import RichText from '../components/RichText';
// import LanguagePicker from '../components/LanguagePicker';

// export default function GlobalResourcePage({ data, location }) {
//   const defaultLanguage = 'en';
//   const paramLanguage = location.search.split('=')[1];
//   const [selectedLanguage, setSelectedLanguage] = useState(paramLanguage ? paramLanguage : defaultLanguage);

//   const availableLanguages =
//     data.contentfulGlobalContainer.referencedLanguage.map(
//       resource => resource.language
//     );

//   const handleLanguageSelect = e => {
//     const lang = e.currentTarget.getAttribute('data-content') || 'en';
//     setSelectedLanguage(lang);
//   };

//   const translatedContent =
//     data.contentfulGlobalContainer.referencedLanguage.filter(
//       resource => resource.language === selectedLanguage
//     )[0];

//   console.log(translatedContent);
//   return (
//     <Layout>
//       <>
//         <div className="p-10 pt-0 pb-5">
//           <LanguagePicker
//             languages={availableLanguages}
//             handler={handleLanguageSelect}
//           />

//           <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-header">
//             <div className="resource-header__title-wrapper col-span-3">
//               <h1 className="resource-header__title">
//                 {translatedContent.title}
//               </h1>
//               {translatedContent.fullAuthor && (
//                 <p className="resource-header__named_authors">
//                   {translatedContent.fullAuthor.fullAuthor}
//                 </p>
//               )}
//               {translatedContent.introduction && (
//                 <p className="resource-introduction">
//                   {translatedContent.introduction.introduction}{' '}
//                 </p>
//               )}
//             </div>
//             <div className="resource-header__image col-span-2 col-start-5">
//               <GatsbyImage
//                 image={getImage(translatedContent.headerImage)}
//                 alt="blog image"
//               />
//             </div>
//           </div>
//         </div>

//         {/* {% if page.fixed_nav %}
//             {% include components/fixed-nav.html %}
//           {% endif %} */}
//         {translatedContent.fixedNav && (
//           <FixedNav
//             toc={
//               translatedContent.markdownBody.childrenMarkdownRemark[0]
//                 .tableOfContents
//             }
//             content={translatedContent.body}
//           />
//         )}

//         <div className="p-10 pt-0 pb-5">
//           <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-body">
//             <div className="col-span-3">
//               {translatedContent.body ? (
//                 <RichText content={translatedContent.body} />
//               ) : (
//                 translatedContent.markdownBody && (
//                   <MarkdownText
//                     content={
//                       translatedContent.markdownBody.childrenMarkdownRemark[0]
//                         .html
//                     }
//                   />
//                 )
//               )}
//             </div>
//             <div className="col-span-2 col-start-5">
//               <a
//                 href={translatedContent.buttonUrl}
//                 className="link link--notched notched notched--border"
//               >
//                 {translatedContent.buttonText}
//               </a>
//             </div>
//           </div>
//         </div>
//       </>
//     </Layout>
//   );
// }

// export const query = graphql`
//   query ($id: String!) {
//     contentfulGlobalContainer(id: { eq: $id }) {
//       id
//       title
//       referencedLanguage {
//         language
//         fullAuthor {
//           fullAuthor
//         }
//         headerImage {
//           id
//           gatsbyImage(width: 600)
//         }
//         buttonText
//         buttonUrl
//         introduction {
//           introduction
//         }
//         markdownBody {
//           id
//           childrenMarkdownRemark {
//             id
//             html
//             tableOfContents
//           }
//         }
//         body {
//           raw
//           references {
//             ... on ContentfulAsset {
//               contentful_id
//               __typename
//               title
//               description
//               url
//             }
//             ... on ContentfulFigure {
//               contentful_id
//               __typename
//               id
//               title
//               image {
//                 url
//                 gatsbyImage(width: 900)
//               }
//               caption {
//                 caption
//               }
//               sys {
//                 contentType {
//                   sys {
//                     id
//                   }
//                 }
//               }
//             }
//           }
//         }
//         prettyUrl
//         fixedNav
//         noIndex
//         type
//         publicationDate
//         people {
//           id
//           displayName
//           prettyUrl
//         }
//       }
//     }
//   }
// `;
