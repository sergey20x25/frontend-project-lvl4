import React from 'react';
import { connect } from 'react-redux';
import DeleteChannelModal from './DeleteChannelModal';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';

const MODAL_COMPONENTS = {
  DELETE_CHANNEL: DeleteChannelModal,
  ADD_CHANNEL: AddChannelModal,
  RENAME_CHANNEL: RenameChannelModal,
};

const mapStateToProps = ({ modal }) => (modal);

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect(mapStateToProps)(ModalRoot);
