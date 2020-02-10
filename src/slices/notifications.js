import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const slice = createSlice({
  name: 'notifications',
  initialState: { visible: false },
  reducers: {
    showNotification(state, { payload }) {
      return { ...payload, visible: true };
    },
    hideNotification(state) {
      return { ...state, visible: false };
    },
  },
});
const {
  showNotification,
  hideNotification,
} = slice.actions;

const useNotificationsActions = () => {
  const dispatch = useDispatch();

  const showAutoHideNotification = (payload) => {
    const notificationShowTime = 7000;
    dispatch(showNotification(payload));
    setTimeout(() => {
      dispatch(hideNotification());
    }, notificationShowTime);
  };
  return { showAutoHideNotification };
};

const actions = { ...slice.actions };

export {
  actions,
  useNotificationsActions,
};
export default slice.reducer;
