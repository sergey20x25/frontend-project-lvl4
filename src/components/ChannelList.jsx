import React from 'react';

const ChannelList = ({ channels }) => (
  <div className="p-3">
    <h6>Channels</h6>
    {channels.map(({ id, name }) => (
      <div key={id}>
        {`#${name}`}
      </div>
    ))}
  </div>
);

export default ChannelList;
