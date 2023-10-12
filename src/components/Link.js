import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

export const ArrowLink = ({ text, location, external = false, variant }) => {
  let isInverted;
  switch (variant) {
    case 'inverted':
      isInverted = true;
      break;
    default:
      isInverted = false;
  }
  let linkClasses = classNames(...['link', 'link--arrow', isInverted && 'inverted']);
  if (!external) {
    return (
      <Link to={location} className={linkClasses}>
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={location}
        target="_blank"
        rel="noreferrer"
        className={linkClasses}
      >
        {text}
      </a>
    );
  }
};

export const NotchedButtonLink = ({ text, location, external = false, variant }) => {
  let isInverted;
  switch (variant) {
    case 'inverted':
      isInverted = true;
      break;
    default:
      isInverted = false;
  }
  let linkClasses = classNames(...['link', 'link--notched', 'notched', 'notched--border', isInverted && 'inverted']);
  if (!external) {
    return (
      <Link to={location} className={linkClasses}>
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={location}
        target="_blank"
        rel="noreferrer"
        className={linkClasses}
      >
        {text}
      </a>
    );
  }
};