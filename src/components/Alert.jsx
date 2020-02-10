import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../slices';

const mapStateToProps = ({ alert }) => (
  { alert }
);

const Alert = (props) => {
  const { alert, hideAlert } = props;
  if (!alert.visible) {
    return null;
  }

  const handleClose = () => {
    hideAlert();
  };

  return (
    <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
      {alert.text}
      <button onClick={handleClose} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default connect(mapStateToProps, actions)(Alert);
