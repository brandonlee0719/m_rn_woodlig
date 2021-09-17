import {
  INDIVIDUAL_ROLES,
  ROLE_TYPES,
  SELECTED_INDIVIDUAL_ROLES,
  SELECTED_BUSINESS_ROLES,
  DELETED_INDIVIDUAL_ROLE
} from '../actions/reduxActions';

const initialState = {
  individual: [],
  roletypes: [],
  selectedindividual: [],
  deletedindividual: '',
  selectedbusiness: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INDIVIDUAL_ROLES:
      return {
        ...state,
        roletypes: action.payload
      };
    case ROLE_TYPES:
      return {
        ...state,
        individual: action.payload
      };
    case SELECTED_INDIVIDUAL_ROLES:
      return {
        ...state,
        selectedindividual: action.payload
      };
    case DELETED_INDIVIDUAL_ROLE:
      return {
        ...state,
        deletedindividual: action.payload
      };
    case SELECTED_BUSINESS_ROLES:
      return {
        ...state,
        selectedbusiness: action.payload
      };
    default:
      return state;
  }
}
