import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  allIds: [],
  createChannelState: 'none',
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
  },
});

const { actions, reducer } = channels;

export const {
  selectChannel,
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
} = actions;

export default reducer;
