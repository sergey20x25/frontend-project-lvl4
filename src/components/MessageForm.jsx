import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { actions, asyncActions } from '../slices';
import UserContext from '../user-context';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId } } = state;
  return { currentChannelId };
};

const MessageForm = (props) => {
  const { showAlert, currentChannelId } = props;
  const { useMessageActions } = asyncActions;
  const { sendMessage } = useMessageActions();
  const textInput = React.createRef();
  const userName = useContext(UserContext);

  const handleSubmit = async ({ text }, { setSubmitting, resetForm }) => {
    const message = {
      text,
      from: userName,
      time: Date.now(),
    };
    try {
      await sendMessage(message, currentChannelId);
    } catch (e) {
      showAlert({ text: e.message });
      throw e;
    }
    setSubmitting(false);
    resetForm();
    textInput.current.focus();
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form
          className="form-inline pl-2 mt-auto d-flex"
        >
          <div className="input-group flex-fill py-3">
            <input
              {...formik.getFieldProps('text')}
              className="form-control"
              placeholder="Message"
              autoFocus
              name="text"
              id="text"
              required
              type="text"
              disabled={formik.isSubmitting}
              ref={textInput}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                value="Add"
                disabled={formik.isSubmitting}
              >
                send
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default connect(mapStateToProps, actions)(MessageForm);
