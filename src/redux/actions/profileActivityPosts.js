import axios from 'axios';
import { PROFILE_ACTIVITY_POSTS } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const profileActivityPosts = profile => dispatch => {
  axios
    .post(`${apiurl}fetch-user-posts.php`, profile)
    .then(res => {
      //   console.log(res.data);
      dispatch({
        type: PROFILE_ACTIVITY_POSTS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
