import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import { actions as channelsActions } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    sendMessageState: 'none',
  },
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
    sendMessageRequest(state) {
      state.sendMessageState = 'requested';
    },
    sendMessageSuccess(state) {
      state.sendMessageState = 'finished';
    },
    sendMessageFailure(state) {
      state.sendMessageState = 'failed';
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { id: channelId } }) => {
      const newMessages = state.messages.filter((m) => m.channelId !== channelId);
      return {
        ...state,
        messages: newMessages,
      };
    },
  },
});

const {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} = slice.actions;

const useMessageActions = () => {
  const dispatch = useDispatch();
  const sendMessage = async (message, channelId) => {
    dispatch(sendMessageRequest());
    const url = routes.channelMessagesPath(channelId);
    const data = { data: { attributes: message } };
    try {
      await axios.post(url, data);
      dispatch(sendMessageSuccess());
    } catch (e) {
      dispatch(sendMessageFailure());
      throw e;
    }
  };
  return { sendMessage };
};

const actions = { ...slice.actions };
export {
  actions,
  useMessageActions,
};
export default slice.reducer;
