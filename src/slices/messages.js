import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as channelsActions } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.push(message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { id: channelId } }) => (
      state.filter((m) => m.channelId !== channelId)
    ),
  },
});

const useMessageActions = () => {
  const sendMessage = async (message, channelId) => {
    const url = routes.channelMessagesPath(channelId);
    const data = { data: { attributes: message } };
    await axios.post(url, data);
  };
  return { sendMessage };
};

const actions = { ...slice.actions };
export {
  actions,
  useMessageActions,
};
export default slice.reducer;
