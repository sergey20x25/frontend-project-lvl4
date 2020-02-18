import { createSelector } from 'reselect';

const getChannels = (state) => state.channels;
const getMessages = (state) => state.messages;

const getCurrentChannelId = (state) => state.currentChannelId;

export const currentChannelSelector = createSelector(
  [getChannels, getCurrentChannelId],
  (channels, currentChannelId) => channels.find((c) => c.id === currentChannelId),
);

export const currentChannelMessagesSelector = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter((m) => m.channelId === currentChannelId)
    .sort((a, b) => (new Date(a.time) - new Date(b.time))),
);
