import { createSlice } from '@reduxjs/toolkit';
import { deleteChannelSuccess } from './channelsSlice';

const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.push(message);
    },
  },
  extraReducers: {
    [deleteChannelSuccess]: (state, { payload: channelId }) => {
      const newMessages = state.filter((m) => m.channelId !== channelId);
      return newMessages;
    },
  },
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
