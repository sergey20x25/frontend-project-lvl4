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
import createInitialState from './createInitialState';
import socketListener from './socketListener';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const initialState = createInitialState(gon);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

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
