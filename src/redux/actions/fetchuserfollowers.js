import axios from 'axios';
import { FETCH_USER_FOLLOWERS } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchuserfollowers = data => dispatch => {
  axios
    .get(`${apiurl}fetch-user-followers.php?user_id=${data}`)
    .then(res => {
      dispatch({
        type: FETCH_USER_FOLLOWERS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
