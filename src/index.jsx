import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import alertReducer from './slices/alertSlice';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import sendMessageStateReducer from './slices/sendMessageStateSlice';
import App from './components/App';
import UserContext from './user-context';
import createInitialState from './createInitialState';
import socketListener from './socketListener';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const reducer = {
  alert: alertReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  sendMessageState: sendMessageStateReducer,
};

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const preloadedState = createInitialState(gon);

const store = configureStore({
  reducer,
  middleware,
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
  preloadedState,
});

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.firstName());
}
const userName = cookies.get('userName');

socketListener(store);

render(
  <Provider store={store}>
    <UserContext.Provider value={userName}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
