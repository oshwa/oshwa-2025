import React, { useCallback, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
// import FixedNav from '../components/FixedNav';
import RichText from '../components/RichText';
import LanguagePicker from '../components/LanguagePicker';
import Video from '../components/Video';
import MarkdownText from '../components/MarkdownText';

export default function GlobalResourcePage({ data, location }) {
  const defaultLanguage = 'English';

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleLanguageSelect = e => {
    const lang = e.currentTarget.getAttribute('data-content') || 'English';
    setSelectedLanguage(lang);
  };

  const capFirstLet = str => {
    if (str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  };
  const handleUrlParams = useCallback(() => {
    let languageSearchValue = new URLSearchParams(location.search).get(
      'language'
    );
    setSelectedLanguage(capFirstLet(languageSearchValue) || defaultLanguage);
  }, [location]);
  const globalContent = data.contentfulGlobalResourceContainer;

  const translatedContent =
    data.contentfulGlobalResourceContainer.translatedResources.filter(
      resource => resource.language === selectedLanguage
    )[0];

  const availableLanguages =
    data.contentfulGlobalResourceContainer.translatedResources.map(content => ({
      language: content.language,
      languageDisplay: content.languageDisplay,
    }));

  useEffect(() => {
    handleUrlParams();
  }, [handleUrlParams]);

  return (
    <Layout>
      <>
        <div className="px-8">
          <LanguagePicker
            languages={availableLanguages}
            handler={handleLanguageSelect}
            currentLanguage={selectedLanguage}
          />

          <div className="grid grid-cols-12 resource-header">
            <div className="resource-header__title-wrapper lg:col-span-7 md:col-span-12 sm:col-span-12">
              <h1 className="resource-header__title">
                {translatedContent.title}
              </h1>
              {globalContent.namedAuthors &&
                globalContent.namedAuthors.namedAuthors && (
                  <p className="resource-header__named_authors">
                    {globalContent.namedAuthors.namedAuthors}
                  </p>
                )}

              {translatedContent.shortDescription.shortDescription && (
                <div className="resource-introduction">
                  <MarkdownText
                    content={
                      translatedContent.shortDescription.childMarkdownRemark
                        .html
                    }
                  />
                </div>
              )}
            </div>
            <div className="resource-header__image lg:col-span-4 lg:col-start-9 md:col-span-12 md:col-start-1  sm:col-span-12 sm:col-start-1">
              {globalContent.resourceImage && (
                <GatsbyImage
                  image={getImage(globalContent.resourceImage)}
                  alt="blog image"
                />
              )}
            </div>
          </div>
        </div>
        {/* {% if page.fixed_nav %}
            {% include components/fixed-nav.html %}
          {% endif %} */}
        {/* {translatedContent.fixedNav && (
          <FixedNav
            toc={
              translatedContent.markdownBody.childrenMarkdownRemark[0]
                .tableOfContents
            }
            content={translatedContent.body}
          />
        )}  */}
        <div className="p-8 pb-5">
          <div className="grid lg:grid-cols-12 resource-body">
            <div className="lg:col-span-7 md:col-span-12">
              {data.contentfulGlobalResourceContainer.youTubeId && (
                <Video
                  videoId={data.contentfulGlobalResourceContainer.youTubeId}
                  size="large"
                />
              )}
              {translatedContent.body && (
                <RichText content={translatedContent.body} />
              )}
            </div>
            {translatedContent.buttonUrl && (
              <div className="lg:col-span-4 lg:col-start-9 md:col-span-12 md:col-start-1">
                <a
                  href={translatedContent.buttonUrl}
                  className="link link--notched notched notched--border"
                >
                  {translatedContent.buttonText}
                </a>
              </div>
            )}
          </div>
        </div>{' '}
      </>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    contentfulGlobalResourceContainer(id: { eq: $id }) {
      id
      resourceTitle
      prettyUrl
      youTubeId
      resourceType
      resourceDate
      resourceAudience
      namedAuthors {
        namedAuthors
      }
      resourceImage {
        id
        gatsbyImageData
      }
      translatedResources {
        id
        title
        subtitle
        language
        languageDisplay
        body {
          raw
          references {
            __typename
            ... on ContentfulFigure {
              contentful_id
              title
              image {
                id
                gatsbyImageData
              }
              caption {
                id
                childMarkdownRemark {
                  id
                  html
                }
              }
            }
            ... on ContentfulButton {
              contentful_id
              __typename
              id
              buttonText
              buttonUrl
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
        shortDescription {
          shortDescription
          childMarkdownRemark {
            html
          }
        }
        buttonUrl
        buttonText
      }
    }
  }
`;
