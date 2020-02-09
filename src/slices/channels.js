import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';

const initialState = {
  byId: {},
  allIds: [],
  createChannelState: 'none',
  deleteChannelFailure: 'none',
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    selectChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
    createChannelRequest(state) {
      state.createChannelState = 'requested';
    },
    createChannelSuccess(state, { payload }) {
      const { channel } = payload;
      const { id } = channel;
      state.byId[id] = channel;
      state.allIds.push(id);
      state.createChannelState = 'finished';
    },
    createChannelFailure(state) {
      state.createChannelState = 'failed';
    },
    deleteChannelRequest(state) {
      state.deleteChannelState = 'requested';
    },
    deleteChannelSuccess(state, { payload: channelId }) {
      const newById = _.omit(state.byId, channelId);
      const newAllIds = state.allIds.filter((id) => id !== channelId);
      const deleteChannelState = 'finished';
      return {
        ...state,
        byId: newById,
        allIds: newAllIds,
        deleteChannelState,
        currentChannelId: 1,
      };
    },
    deleteChannelFailure(state) {
      state.deleteChannelState = 'failed';
    },
    renameChannelRequest(state) {
      state.renameChannelState = 'requested';
    },
    renameChannelSuccess(state, { payload }) {
      const { channel } = payload;
      state.byId[channel.id] = channel;
      state.renameChannelState = 'finished';
    },
    renameChannelFailure(state) {
      state.renameChannelState = 'failed';
    },
  },
});

const {
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
  renameChannelRequest,
  renameChannelSuccess,
  renameChannelFailure,
} = slice.actions;

const useChannelsActions = () => {
  const dispatch = useDispatch();

  const createChannel = async (name) => {
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

  const deleteChannel = async (channelId) => {
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

  const renameChannel = async (channelId, newChannelName) => {
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
