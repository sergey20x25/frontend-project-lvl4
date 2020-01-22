import { createSlice } from '@reduxjs/toolkit';

const channels = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    selectChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
  },
});

const { actions, reducer } = channels;

export const { selectChannel } = actions;

export default reducer;
