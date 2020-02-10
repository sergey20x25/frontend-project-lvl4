import { combineReducers } from 'redux';

import alert, { actions as alertActions } from './alert';
import channels, {
  actions as channelActions,
  useChannelsActions,
} from './channels';
import messages, { actions as messagesActions, useMessageActions } from './messages';
import notifications, { actions as notificationsActions, useNotificationsActions } from './notifications';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  alert,
  channels,
  messages,
  modal,
  notifications,
});

const actions = {
  ...alertActions,
  ...channelActions,
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
