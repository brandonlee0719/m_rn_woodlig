import { ACCOUNT_TYPE } from './reduxActions';

// eslint-disable-next-line import/prefer-default-export
export const accountType = selected => dispatch => {
  dispatch({
    type: ACCOUNT_TYPE,
    payload: selected
  });
};
