import { FETCH_EXPLORE_USERS, FETCH_NEW_USERS } from '../actions/reduxActions';

const initialState = {
  followList: [],
  messageList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXPLORE_USERS:
      return {
        ...state,
        followList: action.payload
      };
    case FETCH_NEW_USERS:
      return {
        ...state,
        messageList: action.payload
      };
    default:
      return state;
  }
}
