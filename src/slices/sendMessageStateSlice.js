import { createSlice } from '@reduxjs/toolkit';

const sendMessageState = createSlice({
  name: 'sendMessageState',
  initialState: 'none',
  reducers: {
    sendMessageRequest() {
      return 'requested';
    },
    sendMessageSuccess() {
      return 'finished';
    },
    sendMessageFailure() {
      return 'failed';
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
