import React from 'react';

const Button = ({ text, content, handler }) => {
  return (
    <button className="btn" data-content={content} onClick={handler}>
      {text}
    </button>
  );
};

export default Button;
