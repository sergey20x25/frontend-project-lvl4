const createInitialState = ({ channels: gonChannels, messages }) => {
  const channelsById = gonChannels.reduce((acc, channel) => {
    const { id } = channel;
    acc[id] = channel;
    return acc;
  }, {});
  const channelsAllIds = gonChannels.map(({ id }) => id);
  return {
    channels: {
      byId: channelsById,
      allIds: channelsAllIds,
      currentChannelId: 1,
    },
    messages: {
      messages,
      sendMessageState: 'none',
    },
    notifications: { visible: false },
  };
};

export default createInitialState;
