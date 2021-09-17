import { FETCH_TRENDING_HASHTAGS } from '../actions/reduxActions';

const initialState = {
  exploretags: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRENDING_HASHTAGS:
      return {
        ...state,
        exploretags: action.payload
      };
    default:
      return state;
  }
}
