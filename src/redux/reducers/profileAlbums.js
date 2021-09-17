import { PROFILE_ACTIVITY_ALBUMS } from '../actions/reduxActions';

const initialState = {
  albums: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_ACTIVITY_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    default:
      return state;
  }
}
