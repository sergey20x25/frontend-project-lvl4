import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ notifications }) => (
  { notifications }
);

const Notification = ({ notifications }) => (
  <div>
    <small>
      <p className="text-secondary m-0 px-2 pb-1 mt-n4">{!notifications.visible ? '' : notifications.text}</p>
    </small>
  </div>
);

export default connect(mapStateToProps)(Notification);
