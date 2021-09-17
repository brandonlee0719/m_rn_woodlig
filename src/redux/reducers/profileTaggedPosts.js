import { PROFILE_TAGGED_POSTS } from '../actions/reduxActions';

const initialState = {
  taggedposts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_TAGGED_POSTS:
      return {
        ...state,
        taggedposts: action.payload
      };
    default:
      return state;
  }
}
