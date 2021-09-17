import axios from 'axios';
import { FETCH_EVENT_TYPE } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const eventType = data => dispatch => {
  axios
    .get(
      `${apiurl}fetch-explore-event-type.php?user_id=${data.user_id}&event_type=${data.event_type}`
    )
    .then(res => {
      dispatch({
        type: FETCH_EVENT_TYPE,
        payload: res.data.data
      });
    })
    .catch(res => console.log(res.data));
};
