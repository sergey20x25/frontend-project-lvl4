import React from 'react';
import UserContext from '../user-context';

class TopNav extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light px-0">
        <a className="navbar-brand" href="/">CHAT</a>
        {`@${this.context}`}
      </div>
    );
  }
}

export default TopNav;
