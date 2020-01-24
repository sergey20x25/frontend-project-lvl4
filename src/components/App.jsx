import React from 'react';
import Alert from './Alert';
import ChannelInfo from './ChannelInfo';
import ChannelList from './ChannelList';
import Dialog from './Dialog';
import MessageForm from './MessageForm';
import TopNav from './TopNav';

const App = () => (
  <div className="container-fluid">
    <div className="row min-vh-100">
      <div className="col-2 bg-light">
        <TopNav />
        <ChannelList />
      </div>
      <div className="col d-flex flex-column">
        <ChannelInfo />
        <Alert />
        <Dialog />
        <MessageForm />
      </div>
    </div>
  </div>
);

export default App;
