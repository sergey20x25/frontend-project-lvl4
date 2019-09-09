import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import { render } from 'react-dom';
import gon from 'gon';
import App from './components/App';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const props = {
  channels: gon.channels,
};

render(
  App(props),
  document.getElementById('chat'),
);
