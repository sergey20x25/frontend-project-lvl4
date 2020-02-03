import axios from 'axios';
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} from '../slices/sendMessageStateSlice';
import {
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
  renameChannelRequest,
  renameChannelSuccess,
  renameChannelFailure,
} from '../slices/channelsSlice';
import routes from '../routes';

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

export const createChannel = (name) => async (dispatch) => {
  dispatch(createChannelRequest());
  const url = routes.channelsPath();
  const data = { data: { attributes: name } };
  try {
    const response = await axios.post(url, data);
    const { data: { data: { attributes: channel } } } = response;
    dispatch(createChannelSuccess({ channel }));
  } catch (e) {
    dispatch(createChannelFailure());
    throw e;
  }
};

export const deleteChannel = (channelId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  const url = routes.channelPath(channelId);
  try {
    await axios.delete(url);
    dispatch(deleteChannelSuccess(channelId));
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const renameChannel = (channelId, newChannelName) => async (dispatch) => {
  dispatch(renameChannelRequest());
  const url = routes.channelPath(channelId);
  const data = { data: { attributes: { name: newChannelName } } };
  try {
    const response = await axios.patch(url, data);
    const { data: { data: { attributes: channel } } } = response;
    dispatch(renameChannelSuccess({ channel }));
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};
