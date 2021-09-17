import { NEW_POST_NAVIGATION } from './reduxActions';

// eslint-disable-next-line import/prefer-default-export
export const navigatePost = post => dispatch => {
  dispatch({
    type: NEW_POST_NAVIGATION,
    payload: post
  });
};
