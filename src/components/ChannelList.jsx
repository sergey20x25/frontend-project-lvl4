import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectChannel } from '../slices/channelsSlice';
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
};

@connect(mapStateToProps, actionCreators)
class ChannelList extends React.Component {
  handleSelectChannel = (id) => () => {
    const { selectChannel } = this.props;
    selectChannel({ id });
  };

  render() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div>
        <h6>Channels</h6>
        <ul className="list-group">
          {channels.map(({ id, name }) => {
            const classes = cn({
              'bg-light': true,
              'list-group-item': true,
              'list-group-item-action': true,
              'font-weight-bold': currentChannelId === id,
            });
            return (
              <button type="button" className={classes} key={id} onClick={this.handleSelectChannel(id)}>
                {`#${name}`}
              </button>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ChannelList;
