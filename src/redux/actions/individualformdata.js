import axios from 'axios';
import { INDIVIDUAL_FORM_DATA, INDIVIDUAL_SENT_DATA, BUSINESS_FORM_DATA } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const individualformdata = data => dispatch => {
  dispatch({
    type: INDIVIDUAL_FORM_DATA,
    payload: data
  });
};

export const businessformdata = data => dispatch => {
  dispatch({
    type: BUSINESS_FORM_DATA,
    payload: data
  });
};

export const individualSentData = values => dispatch => {
  axios
    .post(`${localurl}update-user-setup-details.php`, values)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: INDIVIDUAL_SENT_DATA,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
