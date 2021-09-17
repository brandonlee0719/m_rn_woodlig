import axios from 'axios';
import { FETCH_POST_COMMENTS, CLEAR_POST_COMMENTS } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchPostComments = data => dispatch => {
  console.log(data);
  axios
    .get(`${apiurl}fetch-post-comments.php?user_id=${data.user_id}&post_id=${data.post_id}`)
    .then(res => {
      console.log(res.data);
      // console.log(res.data.data);
      dispatch({
        type: FETCH_POST_COMMENTS,
        payload: res.data
      });
    })
    .catch(res => console.log('error'));
};

export const clearPostComments = () => dispatch => {
  dispatch({
    type: CLEAR_POST_COMMENTS,
    payload: []
  });
};
