import { ACCOUNT_TYPE } from '../actions/reduxActions';

const initialState = {
  acctype: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_TYPE:
      return {
        ...state,
        acctype: action.payload
      };
    default:
      return state;
  }
}
