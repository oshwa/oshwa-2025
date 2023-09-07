import React from 'react';

const Main = ({ pageId, children, active, setActive }) => {
  return (
    <main role="main" id={pageId} className={`${active ? 'main-active' : ''}`}>
      {children}
    </main>
  );
};

export default Main;
