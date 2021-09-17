import { PROFILE_ACTIVITY_POSTS } from '../actions/reduxActions';

const initialState = {
  profileposts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_ACTIVITY_POSTS:
      return {
        ...state,
        profileposts: action.payload
      };
    default:
      return state;
  }
}
