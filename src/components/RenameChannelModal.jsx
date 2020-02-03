import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { hideModal } from '../slices/modalSlice';
import { showAlert } from '../slices/alertSlice';
import { renameChannel } from '../thunkActions';

const mapStateToProps = ({ channels }) => {
  const { byId, currentChannelId } = channels;
  const currentChannel = byId[currentChannelId];
  return { currentChannel };
};

const actionCreators = {
  renameChannel,
  hideModal,
  showAlert,
};

const RenameChannelModal = ({
  currentChannel,
  renameChannel,
  hideModal,
  showAlert,
}) => (
  <Modal show onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>Rename channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        onSubmit={async ({ newChannelName }) => {
          try {
            await renameChannel(currentChannel.id, newChannelName);
            hideModal();
          } catch (e) {
            // showAlert({ text: e.message });
            // hideModal();
            throw e;
          }
        }}
        initialValues={{ newChannelName: '' }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                name="newChannelName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newChannelName}
                placeholder="New channel name"
                aria-label="New channel name"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  disabled={isSubmitting}
                >
                  Rename channel
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={hideModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default connect(mapStateToProps, actionCreators)(RenameChannelModal);
