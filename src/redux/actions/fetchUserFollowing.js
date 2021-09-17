import axios from 'axios';
import { FETCH_USER_FOLLOWING } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchuserfollowing = data => dispatch => {
  axios
    .get(`${apiurl}fetch-user-following.php?user_id=${data}`)
    .then(res => {
      dispatch({
        type: FETCH_USER_FOLLOWING,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
