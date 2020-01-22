import { createSlice } from '@reduxjs/toolkit';

const sendMessageState = createSlice({
  name: 'sendMessageState',
  initialState: 'none',
  reducers: {
    sendMessageRequest(state) {
      state = 'requested';
    },
    sendMessageSuccess(state) {
      state = 'finished';
    },
    sendMessageFailure(state) {
      state = 'failed';
    },
  },
});

const { actions, reducer } = sendMessageState;

export const {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} = actions;

export default reducer;
