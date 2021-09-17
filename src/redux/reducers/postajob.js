import { ADD_CASTING_CALL_ROLES, SUBMIT_CASTING_CALLS } from '../actions/reduxActions';

const initialState = {
  castingcallroles: [],
  response: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CASTING_CALL_ROLES:
      return {
        ...state,
        castingcallroles: action.payload
      };
    case SUBMIT_CASTING_CALLS:
      return {
        ...state,
        response: action.payload
      };
    default:
      return state;
  }
}
