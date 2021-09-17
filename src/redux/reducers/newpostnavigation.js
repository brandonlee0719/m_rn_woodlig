import { NEW_POST_NAVIGATION } from '../actions/reduxActions';

const initialState = {
  newpostroute: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_POST_NAVIGATION:
      return {
        ...state,
        newpostroute: action.payload
      };
    default:
      return state;
  }
}
