import React from 'react';
import ChannelList from './ChannelList';
import TopNav from './TopNav';

const App = ({ channels }) => (
  <>
    <div className="d-flex flex-column vh-100">
      <TopNav />
      <div className="row w-100 flex-grow-1">
        <div className="col-3 bg-info">
          <ChannelList channels={channels} />
        </div>
        <div className="col-9 p-3">
          dialog
        </div>
      </div>
    </div>
  </>
);

export default App;
