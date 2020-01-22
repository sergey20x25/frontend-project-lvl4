import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      state.push(message);
    },
  },
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
