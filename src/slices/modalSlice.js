import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      return { ...payload };
    },
    hideModal() {
      return initialState;
    },
  },
});

const { actions, reducer } = modal;

export const { showModal, hideModal } = actions;

export default reducer;
