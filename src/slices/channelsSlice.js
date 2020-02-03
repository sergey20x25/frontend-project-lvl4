import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  byId: {},
  allIds: [],
  createChannelState: 'none',
  deleteChannelFailure: 'none',
};

const channels = createSlice({
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

const { actions, reducer } = channels;

export const {
  selectChannel,
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  deleteChannelRequest,
  deleteChannelSuccess,
  deleteChannelFailure,
  renameChannelRequest,
  renameChannelSuccess,
  renameChannelFailure,
} = actions;

export default reducer;
