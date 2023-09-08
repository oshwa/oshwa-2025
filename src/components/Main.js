import React from 'react';

const Main = ({ pageId, children, active, setActive }) => {
  return (
    <main role="main" id={pageId} className={`${active ? 'left-push-nav main-active' : 'left-push-nav'}`}>
      {children}
    </main>
  );
};

export default Main;
