import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import MarkdownText from '../components/MarkdownText';
import FixedNav from '../components/FixedNav';
import RichText from '../components/RichText';
import LanguagePicker from '../components/LanguagePicker';

export default function GlobalResourcePage({ data, location }) {
  const defaultLanguage = 'English';

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleLanguageSelect = e => {
    const lang = e.currentTarget.getAttribute('data-content') || 'English';
    setSelectedLanguage(lang);
  };

  const capFirstLet = str => {
    if (str.length) {
      return str[0].toUpperCase() + str.slice(1);
    }
  };
  const handleUrlParams = () => {
    let languageSearchValue = new URLSearchParams(location.search).get(
      'language'
    );
    setSelectedLanguage(capFirstLet(languageSearchValue) || defaultLanguage);
  };
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
  }, []);
  return (
    <Layout>
      <>
        <div className="p-10 pt-0 pb-5">
          <LanguagePicker
            languages={availableLanguages}
            handler={handleLanguageSelect}
            currentLanguage={selectedLanguage}
          />

          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-header">
            <div className="resource-header__title-wrapper col-span-3">
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
                <p className="resource-introduction">
                  {translatedContent.shortDescription.shortDescription}{' '}
                </p>
              )}
            </div>
            <div className="resource-header__image col-span-2 col-start-5">
              {translatedContent.resourceImage && (
                <GatsbyImage
                  image={getImage(translatedContent.headerImage)}
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
        )} */}
        <div className="p-10 pt-0 pb-5">
          <div className="grid lg:grid-cols-6 md:grid-cols-6 resource-body">
            <div className="col-span-3">
              {translatedContent.body && (
                <RichText content={translatedContent.body.raw} />
              )}
            </div>
            {translatedContent.buttonUrl && (
              <div className="col-span-2 col-start-5">
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
      resourceType
      resourceDate
      resourceAudience
      namedAuthors {
        namedAuthors
      }
      translatedResources {
        id
        title
        subtitle
        language
        languageDisplay
        body {
          raw
        }
        shortDescription {
          shortDescription
        }
        resourceImage {
          id
          gatsbyImageData
        }
        buttonUrl
        buttonText
      }
    }
  }
`;
