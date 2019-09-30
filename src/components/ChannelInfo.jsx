import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { channels: { byId, currentChannelId } } = state;
  return { byId, currentChannelId };
};

const ChannelInfo = ({ byId, currentChannelId }) => (
  <div className="navbar navbar-expand-lg px-0 py-3">
    <h6>{`#${byId[currentChannelId].name}`}</h6>
  </div>
);

export default connect(mapStateToProps)(ChannelInfo);
