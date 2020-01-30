import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { hideModal } from '../slices/modalSlice';
import { showAlert } from '../slices/alertSlice';
import { createChannel } from '../thunkActions';

const actionCreators = {
  createChannel,
  hideModal,
  showAlert,
};

const AddChannelModal = ({ createChannel, hideModal, showAlert }) => (
  <Modal show onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        onSubmit={async ({ channelName }) => {
          try {
            await createChannel(channelName);
            hideModal();
          } catch (e) {
            hideModal();
            showAlert({ text: e.message });
            throw e;
          }
        }}
        initialValues={{ channelName: '' }}
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
                name="channelName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.channelName}
                placeholder="Channel name"
                aria-label="Channel name"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  disabled={isSubmitting}
                >
                  Add channel
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

export default connect(null, actionCreators)(AddChannelModal);
