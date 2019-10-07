import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import UserContext from '../user-context';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId } } = state;
  return { currentChannelId };
};

const actionCreators = {
  sendMessage: actions.sendMessage,
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)
class MessageForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = userName => async ({ text }) => {
    const { sendMessage, reset, currentChannelId } = this.props;
    const message = {
      text,
      from: userName,
      time: Date.now(),
    };
    try {
      await sendMessage(message, currentChannelId);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
    this.textInput.getRenderedComponent().focus();
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const userName = this.context;
    return (
      <form className="form-inline pl-2 mt-auto d-flex" onSubmit={handleSubmit(this.handleSubmit(userName))}>
        <div className="input-group flex-fill py-3">
          <Field
            className="form-control"
            placeholder="Message"
            autoFocus
            name="text"
            required
            component="input"
            type="text"
            disabled={submitting}
            ref={(ref) => { this.textInput = ref; }}
            forwardRef
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-outline-secondary"
              value="Add"
              disabled={submitting}
            >
              send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageForm;
