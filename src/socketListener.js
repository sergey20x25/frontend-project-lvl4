import io from 'socket.io-client';
import { addMessage } from './slices/messagesSlice';

const socket = io();

export default (store) => {
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(addMessage({ message }));
  });
};
