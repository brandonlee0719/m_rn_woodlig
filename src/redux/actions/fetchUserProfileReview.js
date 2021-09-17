import axios from 'axios';
import { USER_PROFILE_REVIEWS } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchUserProfileReviews = data => dispatch => {
  axios
    .post(
      `${apiurl}fetch-user-review.php?user_id=${data.user_id}&user_profile_id=${data.user_profile_id}`
    )
    .then(res => {
      console.log(res.data);
      dispatch({
        type: USER_PROFILE_REVIEWS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
