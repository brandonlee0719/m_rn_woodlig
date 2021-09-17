import axios from 'axios';
import { VIEW_POST_DETAILS, CLEAR_POST_DETAILS } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const viewPostDetails = data => dispatch => {
  console.log(data);
  axios
    .get(`${apiurl}view-post-details.php?user_id=${data.user_id}&post_id=${data.post_id}`)
    .then(res => {
      console.log(res.data);
      // console.log(res.data.data);
      dispatch({
        type: VIEW_POST_DETAILS,
        payload: res.data
      });
    })
    .catch(res => console.log('error'));
};

export const clearPostDetails = () => dispatch => {
  dispatch({
    type: CLEAR_POST_DETAILS,
    payload: []
  });
};
