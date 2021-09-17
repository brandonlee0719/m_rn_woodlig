import { FETCH_EVENT_TYPE } from '../actions/reduxActions';

const initialState = {
  event: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENT_TYPE:
      return {
        ...state,
        event: action.payload
      };
    default:
      return state;
  }
}
