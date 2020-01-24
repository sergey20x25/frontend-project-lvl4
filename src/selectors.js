import { createSelector } from 'reselect';

const getChannels = (state) => state.channels.byId;
const getMessages = (state) => state.messages;

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const channelsSelector = createSelector(
  getChannels,
  (channels) => Object.values(channels),
);

export const currentChannelMessagesSelector = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter((m) => m.channelId === currentChannelId)
    .sort((a, b) => (new Date(a.time) - new Date(b.time))),
);
