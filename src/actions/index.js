import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const selectChannel = createAction('CHANNEL_SELECT');
export const addMessage = createAction('MESSAGE_ADD');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = (message, channelId) => async (dispatch) => {
  dispatch(sendMessageRequest());
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: message } };
  try {
    await axios.post(url, data);
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};
