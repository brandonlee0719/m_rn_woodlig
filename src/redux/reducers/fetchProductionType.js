import { FETCH_PRODUCTION_TYPE } from '../actions/reduxActions';

const initialState = {
  productiontype: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTION_TYPE:
      return {
        ...state,
        productiontype: action.payload
      };
    default:
      return state;
  }
}
