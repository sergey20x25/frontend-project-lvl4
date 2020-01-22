import axios from 'axios';
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} from '../slices/sendMessageStateSlice';
import routes from '../routes';

// eslint-disable-next-line import/prefer-default-export
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
