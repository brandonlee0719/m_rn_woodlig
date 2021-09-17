import axios from 'axios';
import { LOGIN } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const loginAuth = login => dispatch => {
  axios
    .post(`${apiurl}login.php`, login)
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
