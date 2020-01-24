import React, { useContext } from 'react';
import UserContext from '../user-context';

const TopNav = () => {
  const userName = useContext(UserContext);
  return (
    <div className="navbar navbar-expand-lg navbar-light px-0">
      <a className="navbar-brand" href="/">CHAT</a>
      {`@${userName}`}
    </div>
  );
};

export default TopNav;
