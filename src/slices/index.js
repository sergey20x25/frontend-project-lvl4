import { combineReducers } from 'redux';

import channels, {
  actions as channelActions,
  useChannelsActions,
} from './channels';
import currentChannelId, { actions as currentChannelIdActions } from './currentChannelId';
import messages, { actions as messagesActions, useMessageActions } from './messages';
import modal, { actions as modalActions } from './modal';
import notifications, { actions as notificationsActions, useNotificationsActions } from './notifications';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  modal,
  notifications,
});

const actions = {
  ...channelActions,
  ...currentChannelIdActions,
  ...messagesActions,
  ...modalActions,
  ...notificationsActions,
};

const asyncActions = {
  useChannelsActions,
  useMessageActions,
  useNotificationsActions,
};

export {
  actions,
  asyncActions,
};
