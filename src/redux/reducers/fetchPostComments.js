import { FETCH_POST_COMMENTS, CLEAR_POST_COMMENTS } from '../actions/reduxActions';

const initialState = {
  postcomments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      return {
        ...state,
        postcomments: action.payload
      };
    case CLEAR_POST_COMMENTS:
      return {
        postcomments: []
      };
    default:
      return state;
  }
}
