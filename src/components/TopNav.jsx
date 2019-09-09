import React from 'react';

const TopNav = () => (
  <header className="row w-100">
    <div className="col-3 bg-info p-2 pl-5">
      <a aria-hidden="true" href="/" className="navbar-brand text-dark">
        Chat
      </a>
    </div>
    <div className="col-9 p-3 border-bottom">
      Channel info
    </div>
  </header>
);

export default TopNav;
