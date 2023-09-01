import React from 'react';

const Main = ({ pageId, children }) => {
  return (
    <main role="main" id={pageId}>
      {children}
    </main>
  );
};

export default Main;
