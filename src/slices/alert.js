import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const slice = createSlice({
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

const {
  showAlert,
  hideAlert,
} = slice.actions;

const useNotificationsActions = () => {
  const dispatch = useDispatch();

  const showAutoHideNotification = (payload) => {
    dispatch(showAlert(payload));
    setTimeout(() => {
      dispatch(hideAlert());
    }, 15000);
  };
  return { showAutoHideNotification };
};

const actions = { ...slice.actions };
export {
  actions,
  useNotificationsActions,
};
export default slice.reducer;