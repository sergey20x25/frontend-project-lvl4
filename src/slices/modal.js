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

export const { actions } = modal;
export default modal.reducer;
