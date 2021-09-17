import { VIEW_ACTIVITY_STREAM, CLEAR_ACTIVITY_STREAM } from '../actions/reduxActions';

const initialState = {
  activitystream: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_ACTIVITY_STREAM:
      return {
        ...state,
        activitystream: [...state.activitystream.concat(action.payload)]
      };
    case CLEAR_ACTIVITY_STREAM:
      return {
        activitystream: []
      };
    default:
      return state;
  }
}
