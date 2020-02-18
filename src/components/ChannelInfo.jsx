import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { actions } from '../slices';
import { currentChannelSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannel: currentChannelSelector(state),
  };
  return props;
};

const ChannelInfo = ({ currentChannel, showModal }) => {
  const handleDeleteChannel = () => {
    showModal({ modalType: 'DELETE_CHANNEL' });
  };

  const handleRenameChannel = () => {
    showModal({ modalType: 'RENAME_CHANNEL' });
  };

  return (
    <div className="navbar navbar-expand-lg px-0 py-3 justify-content-between">
      <h6>{`#${currentChannel.name}`}</h6>
      <ButtonGroup aria-label="Channel buttons">
        <Button
          variant="light"
          size="sm"
          onClick={handleRenameChannel}
        >
          Rename
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={handleDeleteChannel}
          disabled={!currentChannel.removable}
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default connect(mapStateToProps, actions)(ChannelInfo);
