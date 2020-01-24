import { createSlice } from '@reduxjs/toolkit';

const alert = createSlice({
  name: 'alert',
  initialState: { visible: false },
  reducers: {
    showAlert(state, { payload }) {
      return { ...payload, visible: true };
    },
    hideAlert(state) {
      return { ...state, visible: false };
    },
  },
});

const { actions, reducer } = alert;

export const { showAlert, hideAlert } = actions;

export default reducer;
