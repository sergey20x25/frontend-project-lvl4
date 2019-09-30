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
  addMessage: actions.addMessage,
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)
class MessageForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = userName => async ({ text }) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const message = {
      text,
      from: userName,
      time: Date.now(),
    };
    try {
      await addMessage(message, currentChannelId);
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
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit(userName))}>
        <div className="form-group mx-3">
          <Field
            autoFocus
            name="text"
            required
            component="input"
            type="text"
            disabled={submitting}
            ref={(ref) => { this.textInput = ref; }}
            forwardRef
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-sm"
          value="Add"
          disabled={submitting}
        />
      </form>
    );
  }
}

export default MessageForm;
