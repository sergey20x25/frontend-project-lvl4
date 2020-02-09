import { combineReducers } from 'redux';

import alert, { actions as alertActions } from './alert';
import channels, {
  actions as channelActions,
  useChannelsActions,
} from './channels';
import messages, { actions as messagesActions, useMessageActions } from './messages';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  alert,
  channels,
  messages,
  modal,
});

const actions = {
  ...alertActions,
  ...channelActions,
  ...messagesActions,
  ...modalActions,
};

const asyncActions = {
  useChannelsActions,
  useMessageActions,
};

export {
  actions,
  asyncActions,
};
