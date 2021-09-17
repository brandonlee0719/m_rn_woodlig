import { USER_ID } from '../actions/reduxActions';

const initialState = {
  id: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_ID:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
}
