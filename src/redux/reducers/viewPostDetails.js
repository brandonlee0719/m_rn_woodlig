import { VIEW_POST_DETAILS, CLEAR_POST_DETAILS } from '../actions/reduxActions';

const initialState = {
  postdetail: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_POST_DETAILS:
      return {
        ...state,
        postdetail: action.payload
      };
    case CLEAR_POST_DETAILS:
      return {
        postdetail: []
      };
    default:
      return state;
  }
}
