import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { actions, asyncActions } from '../slices';

const mapStateToProps = ({ channels }) => {
  const { byId, currentChannelId } = channels;
  return { byId, currentChannelId };
};

const DeleteChannelModal = ({
  byId,
  currentChannelId,
  hideModal,
}) => {
  const { useChannelsActions, useNotificationsActions } = asyncActions;
  const { deleteChannel } = useChannelsActions();
  const { showAutoHideNotification } = useNotificationsActions();

  const handleClose = () => {
    hideModal();
  };

  const handleDeleteChannel = ({ id, removable }) => async () => {
    if (removable) {
      try {
        await deleteChannel(id);
        hideModal();
      } catch (e) {
        showAutoHideNotification({ text: 'An error occurred while deleting the channel' });
        hideModal();
        throw e;
      }
    }
  };

  const currentChannel = byId[currentChannelId];

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`Delete channel #${currentChannel.name}?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeleteChannel(currentChannel)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actions)(DeleteChannelModal);
