import React from 'react';
import { connect } from 'react-redux';
import { currentChannelMessagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: currentChannelMessagesSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class Dialog extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="flex-fill d-flex flex-column position-relative">
        <ul className="list-group w-100 h-100 d-flex flex-column pl-2 overflow-auto position-absolute">
          {messages.map(({
            text, from, time, id,
          }) => {
            const createdAt = new Date(time);
            return (
              <li key={id} className="list-group-item border-0">
                {`@${from} - ${createdAt.toLocaleString('en-GB')}`}
                <br />
                {text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Dialog;
