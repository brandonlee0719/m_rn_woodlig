import { USER_ID } from './reduxActions';

// eslint-disable-next-line import/prefer-default-export
export const userId = selected => dispatch => {
  dispatch({
    type: USER_ID,
    payload: selected
  });
};
