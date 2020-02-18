import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const initialState = [];

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, { payload: { channel } }) {
      state.push(channel);
    },
    removeChannel(state, { payload: { id: channelId } }) {
      return state.filter((c) => c.id !== channelId);
    },
    changeChannelName(state, { payload: { channel } }) {
      const channelIndex = state.findIndex((c) => c.id === channel.id);
      state[channelIndex] = channel;
    },
  },
});

const useChannelsActions = () => {
  const createChannel = async (name) => {
    const url = routes.channelsPath();
    const data = { data: { attributes: name } };
    await axios.post(url, data);
  };

  const deleteChannel = async (channelId) => {
    const url = routes.channelPath(channelId);
    await axios.delete(url);
  };

  const renameChannel = async (channelId, newChannelName) => {
    const url = routes.channelPath(channelId);
    const data = { data: { attributes: { name: newChannelName } } };
    await axios.patch(url, data);
  };
  return {
    createChannel,
    deleteChannel,
    renameChannel,
  };
};

const actions = { ...slice.actions };
export {
  actions,
  useChannelsActions,
};
export default slice.reducer;
