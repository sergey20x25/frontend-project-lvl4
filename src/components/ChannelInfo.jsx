import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { showModal } from '../slices/modalSlice';

const mapStateToProps = (state) => {
  const { channels: { byId, currentChannelId } } = state;
  return { byId, currentChannelId };
};

const actionCreators = {
  showModal,
};

const ChannelInfo = ({ byId, currentChannelId, showModal }) => {
  const handleDeleteChannel = () => {
    showModal({ modalType: 'DELETE_CHANNEL' });
  };

  const handleRenameChannel = () => {
    showModal({ modalType: 'RENAME_CHANNEL' });
  };

  const currentChannel = byId[currentChannelId];

  return (
    <div className="navbar navbar-expand-lg px-0 py-3">
      <h6>{`#${byId[currentChannelId].name}`}</h6>
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

export default connect(mapStateToProps, actionCreators)(ChannelInfo);
