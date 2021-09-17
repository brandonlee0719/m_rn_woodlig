import axios from 'axios';
import { REGISTER } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const registerUser = register => dispatch => {
  axios
    .post(`${apiurl}register.php`, register)
    .then(res => {
      dispatch({
        type: REGISTER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
