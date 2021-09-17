import { REGISTER } from '../actions/reduxActions';

const initialState = {
  values: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        values: action.payload
      };
    default:
      return state;
  }
}
