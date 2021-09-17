import axios from 'axios';
import { FETCH_EXPLORE_USERS, FETCH_NEW_USERS } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchExploreUsers = data => dispatch => {
  axios
    .get(`${apiurl}fetch-explore-users.php?user_id=${data.user_id}`)
    .then(res => {
      dispatch({
        type: FETCH_EXPLORE_USERS,
        payload: res.data.data
      });
    })
    .catch(res => console.log(res.data));
};

export const fetchNewUsers = data => dispatch => {
  axios
    .get(`${apiurl}fetch-new-users.php?user_id=${data.user_id}`)
    .then(res => {
      dispatch({
        type: FETCH_NEW_USERS,
        payload: res.data.data
      });
    })
    .catch(res => console.log(res.data));
};
