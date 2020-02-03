import React from 'react';
import Alert from './Alert';
import ChannelInfo from './ChannelInfo';
import ChannelList from './ChannelList';
import Dialog from './Dialog';
import MessageForm from './MessageForm';
import TopNav from './TopNav';
import ModalRoot from './ModalRoot';

const App = () => (
  <div className="container-fluid">
    <div className="row min-vh-100">
      <div className="px-3 bg-light w-30">
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
    <ModalRoot />
  </div>
);

export default App;
