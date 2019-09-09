import React from 'react';
import ChannelInfo from './ChannelInfo';
import ChannelList from './ChannelList';
import Dialog from './Dialog';
import TopNav from './TopNav';

const App = ({ channels }) => (
  <>
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-2 bg-light">
          <TopNav />
          <ChannelList channels={channels} />
        </div>
        <div className="col">
          <ChannelInfo />
          <Dialog />
        </div>
      </div>
    </div>
  </>
);

export default App;
