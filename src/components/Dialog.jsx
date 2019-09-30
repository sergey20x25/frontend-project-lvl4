import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages } = state;
  return { messages };
};

@connect(mapStateToProps)
class Dialog extends React.Component {
  render() {
    return (
      <div>dialog</div>
    );
  }
}

export default Dialog;
