import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import reducers from './reducers';
import App from './components/App';
import UserContext from './user-context';

// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const createInitialState = ({ channels: gonChannels }) => {
  const channelsById = gonChannels.reduce((acc, channel) => {
    const { id } = channel;
    acc[id] = channel;
    return acc;
  }, {});
  const channelsAllIds = gonChannels.map(({ id }) => id);
  return {
    channels: {
      byId: channelsById,
      allIds: channelsAllIds,
      currentChannelId: 1,
    },
  };
};

const initialState = createInitialState(gon);

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.firstName());
}
const userName = cookies.get('userName');

render(
  <Provider store={store}>
    <UserContext.Provider value={userName}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
