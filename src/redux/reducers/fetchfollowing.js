import { FETCH_USER_FOLLOWING } from '../actions/reduxActions';

const initialState = {
  following: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_FOLLOWING:
      return {
        ...state,
        following: action.payload
      };
    default:
      return state;
  }
}
