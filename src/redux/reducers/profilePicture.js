import { PROFILE_PICTURE, GET_USERNAME } from '../actions/reduxActions';

const initialState = {
  picture: '',
  username: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_PICTURE:
      return {
        ...state,
        picture: action.payload
      };
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
}
