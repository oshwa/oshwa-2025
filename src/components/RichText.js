import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import slugify from 'slugify';

const Text = ({ children }) => <p className="">{children}</p>
const Bold = ({ children }) => <span className="font-bold">{children}</span>
const Italic = ({ children }) => <em className="font-italic">{children}</em>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => {
      // return <h2 className='heading-h2' id={slugify(children[0], { lower: true })}>{children}</h2>
      return <h2 className='heading-h2'>{children}</h2>
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      // return <h3 className='heading-h3' id={slugify(children[0], { lower: true })}>{children}</h3>
      return <h3 className='heading-h3'>{children}</h3>
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      // return <h4 className='heading-h4' id={slugify(children[0], { lower: true })}>{children}</h4>
      return <h4 className='heading-h4'>{children}</h4>
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const url = node.data.target.url

      return (
        <div className="image-container">
          <img src={url} alt={node.data.target.description} />
          {/* <code>{JSON.stringify(node, null, 2)}</code> */}
        </div>
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      return (
        <div className="figure-container notched notched--border ">
          <h4>{node.data.target.title}</h4>
          <GatsbyImage
            image={getImage(node.data.target.image)}
            alt={node.data.target.title}
          />
          <p className="figure-caption">{node.data.target.caption.caption}</p>
        </div>
      )
    },
  },
}

const RichText = ({ content }) => {
  console.log(content,'content')
  return <div className="richtext-content">{renderRichText(content, options)}</div>
};

export default RichText;