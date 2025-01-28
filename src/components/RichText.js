import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import slugify from 'slugify';
import MarkdownText from './MarkdownText';
import { NotchedButtonLink } from './Link';
import EmbeddedTable from './EmbeddedTable';
const Text = ({ children }) => <p className="">{children}</p>;
const Bold = ({ children }) => <span className="font-bold">{children}</span>;
const Italic = ({ children }) => <em className="font-italic">{children}</em>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <h2
          className="heading-h2"
          id={slugify(node.content[0].value, { lower: true })}
        >
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return (
        <h3
          className="heading-h3"
          id={slugify(node.content[0].value, { lower: true })}
        >
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return (
        <h4
          className="heading-h4"
          id={slugify(node.content[0].value, { lower: true })}
        >
          {children}
        </h4>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const url = node.data.target.url;

      return (
        <div className="image-container">
          <img src={url} alt={node.data.target.description} />
          {/* <code>{JSON.stringify(node, null, 2)}</code> */}
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const targetType = node.data.target.__typename;

      if (targetType === 'ContentfulTable') {
        {
          console.log(node);
        }
        return (
          <EmbeddedTable
            title={node.data.target.title}
            table={node.data.target.table}
            caption={node.data.target.caption}
          />
        );
      }

      if (targetType === 'ContentfulFigure') {
        return (
          <div className="figure-container notched notched--border">
            <h4>{node.data.target.title}</h4>
            <div className="img-container">
              <GatsbyImage
                image={getImage(node.data.target.image)}
                alt={node.data.target.title}
              />
            </div>
            {node.data.target.caption && (
              <p className="figure-caption">
                <MarkdownText
                  content={node.data.target.caption.childMarkdownRemark.html}
                />
              </p>
            )}
          </div>
        );
      }

      if (targetType === 'ContentfulButton') {
        return (
          <NotchedButtonLink
            text={node.data.target.buttonText}
            location={node.data.target.buttonUrl}
          />
        );
      }
    },
  },
};

const RichText = ({ content }) => {
  // console.log(content, 'content')
  return (
    <div className="richtext-content">{renderRichText(content, options)}</div>
  );
};

export default RichText;
