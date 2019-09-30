import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';

const channels = handleActions({
  [actions.selectChannel](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, { byId: {}, allIds: [] });

const addMessageState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
}, 'none');

export default combineReducers({
  channels,
  addMessageState,
  form: formReducer,
});
