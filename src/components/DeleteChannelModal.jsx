import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { hideModal } from '../slices/modalSlice';
import { showAlert } from '../slices/alertSlice';
import { deleteChannel } from '../thunkActions';

const mapStateToProps = ({ channels }) => {
  const { byId, currentChannelId } = channels;
  return { byId, currentChannelId };
};

const actionCreators = {
  deleteChannel,
  hideModal,
  showAlert,
};

const DeleteChannelModal = ({
  byId,
  currentChannelId,
  deleteChannel,
  hideModal,
  showAlert,
}) => {
  const handleDeleteChannel = ({ id, removable }) => async () => {
    if (removable) {
      try {
        await deleteChannel(id);
        hideModal();
      } catch (e) {
        showAlert({ text: e.message });
        hideModal();
        throw e;
      }
    } else {
      showAlert({ text: 'You can\'t delete this channel' });
      hideModal();
    }
  };

  const currentChannel = byId[currentChannelId];

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete channel?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeleteChannel(currentChannel)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(DeleteChannelModal);
