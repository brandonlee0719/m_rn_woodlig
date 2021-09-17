import { PROFILE_PICTURE, GET_USERNAME } from './reduxActions';

// eslint-disable-next-line import/prefer-default-export
export const profilePicture = selected => dispatch => {
  dispatch({
    type: PROFILE_PICTURE,
    payload: selected
  });
};

export const getUsername = selected => dispatch => {
  dispatch({
    type: GET_USERNAME,
    payload: selected
  });
};
