import React from 'react';
import ChannelInfo from './ChannelInfo';
import ChannelList from './ChannelList';
import Dialog from './Dialog';
import MessageForm from './MessageForm';
import ModalRoot from './ModalRoot';
import Notification from './Notification';
import TopNav from './TopNav';

const App = () => (
  <div className="container-fluid">
    <div className="row min-vh-100">
      <div className="px-3 bg-light w-30">
        <TopNav />
        <ChannelList />
      </div>
      <div className="col d-flex flex-column">
        <ChannelInfo />
        <Dialog />
        <MessageForm />
        <Notification />
      </div>
    </div>
    <ModalRoot />
  </div>
);

export default App;
