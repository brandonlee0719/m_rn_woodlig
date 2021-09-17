import {
  INDIVIDUAL_FORM_DATA,
  INDIVIDUAL_SENT_DATA,
  BUSINESS_FORM_DATA
} from '../actions/reduxActions';

const initialState = {
  individualData: [],
  sentData: [],
  businessData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INDIVIDUAL_FORM_DATA:
      return {
        ...state,
        individualData: action.payload
      };
    case INDIVIDUAL_SENT_DATA:
      return {
        ...state,
        sentData: action.payload
      };
    case BUSINESS_FORM_DATA:
      return {
        ...state,
        businessData: action.payload
      };
    default:
      return state;
  }
}
