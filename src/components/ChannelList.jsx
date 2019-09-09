import React from 'react';

const ChannelList = ({ channels }) => (
  <div>
    <h6>Channels</h6>
    {channels.map(({ id, name }) => (
      <div key={id}>
        {`#${name}`}
      </div>
    ))}
  </div>
);

export default ChannelList;
