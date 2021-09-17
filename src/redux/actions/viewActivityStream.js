import axios from 'axios';
import { VIEW_ACTIVITY_STREAM, CLEAR_ACTIVITY_STREAM } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const viewActivityStream = data => dispatch => {
  axios
    .post(`${apiurl}view-activity-stream.php`, data)
    .then(res => {
      if (res.data.status === 'success') {
        // console.log(res.data.data);
        dispatch({
          type: VIEW_ACTIVITY_STREAM,
          payload: res.data.data
        });
      } else if (res.data.status === 'empty') {
        // console.log(res.data);
        dispatch({
          type: VIEW_ACTIVITY_STREAM,
          payload: []
        });
      }
    })
    .catch(res => console.log(res.data));
};

export const clearActivityStream = () => dispatch => {
  dispatch({
    type: CLEAR_ACTIVITY_STREAM,
    payload: []
  });
};
