import { FETCH_USER_FOLLOWERS } from '../actions/reduxActions';

const initialState = {
  followers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      };
    default:
      return state;
  }
}
