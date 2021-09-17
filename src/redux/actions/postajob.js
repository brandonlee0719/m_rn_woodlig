import axios from 'axios';
import { ADD_CASTING_CALL_ROLES, SUBMIT_CASTING_CALLS } from './reduxActions';
import { localurl, apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const castingCallRolesItems = post => dispatch => {
  dispatch({
    type: ADD_CASTING_CALL_ROLES,
    payload: post
  });
};

export const submitcastingcalls = post => dispatch => {
  axios
    .post(`${localurl}add-casting-call.php?user_id=3`, post)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SUBMIT_CASTING_CALLS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
