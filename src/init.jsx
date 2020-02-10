import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import io from 'socket.io-client';
import reducer, { actions } from './slices';
import App from './components/App';
import UserContext from './user-context';
import createInitialState from './createInitialState';

export default () => {
  const preloadedState = createInitialState(gon);

  const store = configureStore({
    reducer,
    preloadedState,
  });

  if (!cookies.get('userName')) {
    cookies.set('userName', faker.name.firstName());
  }
  const userName = cookies.get('userName');

  const socket = io();
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(actions.addMessage({ message }));
  });
  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(actions.addChannel({ channel }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannel({ id }));
  });
  socket.on('renameChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(actions.changeChannelName({ channel }));
  });

  render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
