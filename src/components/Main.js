import React from 'react';

const Main = ({ pageId, children, active }) => {
  return (
    <main role="main" id={pageId} className={`${active ? `active` : ``}`}>
      {children}
    </main >
  );
};

export default Main;
