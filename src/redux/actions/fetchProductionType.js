import axios from 'axios';
import { FETCH_PRODUCTION_TYPE } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchProductionType = () => dispatch => {
  axios
    .get(`${apiurl}fetch-production-type.php`)
    .then(res => {
      dispatch({
        type: FETCH_PRODUCTION_TYPE,
        payload: res.data.data
      });
    })
    .catch(res => console.log(res.data));
};
