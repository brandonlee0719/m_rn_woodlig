import { LOGIN } from '../actions/reduxActions';

const initialState = {
  response: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        response: action.payload
      };
    default:
      return state;
  }
}
