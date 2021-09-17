import axios from 'axios';
import { PROFILE_TAGGED_POSTS } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const profileTaggedPosts = profile => dispatch => {
  axios
    .post(`${apiurl}fetch-user-tagged-posts.php`, profile)
    .then(res => {
      dispatch({
        type: PROFILE_TAGGED_POSTS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
