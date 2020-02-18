import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const initialState = 1;

const slice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    selectChannel(state, { payload: { id } }) {
      return id;
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: () => 1,
  },
});

export const { actions } = slice;
export default slice.reducer;
