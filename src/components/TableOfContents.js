import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import slugify from 'slugify';

const extractHeaders = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => {
      return <li><a className='toc__anchor h2' href={`#${slugify(children[0], { lower: true })}`}>{children}</a></li>
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <li><a className='toc__anchor h3' href={`#${slugify(children[0], { lower: true })}`}>{children}</a></li>
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <li><a className='toc__anchor h4' href={`#${slugify(children[0], { lower: true })}`}>{children}</a></li>
    },
    [BLOCKS.PARAGRAPH]: (node, children) => { },
    [BLOCKS.EMBEDDED_ASSET]: node => { },
    [BLOCKS.EMBEDDED_ENTRY]: node => { },
  }
}

const TableOfContents = ({ post, content }) => {
  return (
    <>
      <ol className="toc">
        {renderRichText(content, extractHeaders)}
      </ol>
    </>
  )
}

export default TableOfContents;
