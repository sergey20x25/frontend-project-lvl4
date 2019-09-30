import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const selectChannel = createAction('CHANNEL_SELECT');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (message, channelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: message } };
  try {
    await axios.post(url, data);
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};
