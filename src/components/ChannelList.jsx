import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectChannel } from '../slices/channelsSlice';
import { showModal } from '../slices/modalSlice';
import { channelsSelector, getCurrentChannelId } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: getCurrentChannelId(state),
  };
  return props;
};

const actionCreators = {
  selectChannel,
  showModal,
};

const ChannelList = (props) => {
  const {
    channels,
    currentChannelId,
    selectChannel,
    showModal,
  } = props;

  const handleSelectChannel = (id) => () => {
    selectChannel({ id });
  };

  const handleAddChannel = () => {
    showModal({ modalType: 'ADD_CHANNEL' });
  };

  return (
    <div>
      <h6>Channels</h6>
      <ul className="list-group">
        <button
          type="button"
          className="bg-light list-group-item list-group-item-action"
          onClick={handleAddChannel}
        >
          Add channel...
        </button>
        {channels.map(({ id, name }) => {
          const classes = cn({
            'bg-light': true,
            'list-group-item': true,
            'list-group-item-action': true,
            'font-weight-bold': currentChannelId === id,
          });
          return (
            <button type="button" className={classes} key={id} onClick={handleSelectChannel(id)}>
              {`#${name}`}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelList);
