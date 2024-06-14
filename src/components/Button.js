import React from 'react';

const Button = ({ text, content, handler, additionalClass }) => {
  return (
    <button className={`btn ${additionalClass}`} data-content={content} onClick={handler}>
      {text}
    </button>
  );
};

export default Button;
