import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { actions, asyncActions } from '../slices';

const AddChannelModal = ({ hideModal }) => {
  const inputRef = useRef(null);
  const { useChannelsActions, useNotificationsActions } = asyncActions;
  const { createChannel } = useChannelsActions();
  const { showAutoHideNotification } = useNotificationsActions();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const handleClose = () => {
    hideModal();
  };

  const handleAddChannel = async ({ channelName }) => {
    try {
      await createChannel(channelName);
      hideModal();
    } catch (e) {
      showAutoHideNotification(e.message);
      hideModal();
    }
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={handleAddChannel}
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
                  ref={inputRef}
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actions)(AddChannelModal);
