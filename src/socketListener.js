import io from 'socket.io-client';
import { addMessage } from './actions';

const socket = io();

export default (store) => {
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(addMessage({ message }));
  });
};
