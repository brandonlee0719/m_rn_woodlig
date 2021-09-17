import { USER_PROFILE_REVIEWS } from '../actions/reduxActions';

const initialState = {
  reviews: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    default:
      return state;
  }
}
