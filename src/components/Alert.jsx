import React from 'react';
import { connect } from 'react-redux';
import { hideAlert } from '../slices/alertSlice';

const mapStateToProps = ({ alert }) => (
  { alert }
);

const actionCreators = {
  hideAlert,
};

const Alert = (props) => {
  const { alert, hideAlert } = props;
  if (!alert.visible) {
    return null;
  }

  return (
    <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
      {alert.text}
      <button onClick={hideAlert} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Alert);
