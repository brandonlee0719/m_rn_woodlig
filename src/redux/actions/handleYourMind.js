import { ADD_POST_LOCATION, ADD_POST_TAG, POST_VALUES } from './reduxActions';

// eslint-disable-next-line import/prefer-default-export
export const addlocation = location => dispatch => {
  dispatch({
    type: ADD_POST_LOCATION,
    payload: location
  });
};

export const tagPeople = people => dispatch => {
  dispatch({
    type: ADD_POST_TAG,
    payload: people
  });
};

export const postValues = data => dispatch => {
  dispatch({
    type: POST_VALUES,
    payload: data
  });
};
