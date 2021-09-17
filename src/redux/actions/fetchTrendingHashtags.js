import axios from 'axios';
import { FETCH_TRENDING_HASHTAGS } from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchTrendingHashtags = data => dispatch => {
  axios
    .get(`${apiurl}fetch-trending-tags.php?user_id=${data.user_id}&explore=${data.explore}`)
    .then(res => {
      dispatch({
        type: FETCH_TRENDING_HASHTAGS,
        payload: res.data.data
      });
    })
    .catch(res => console.log(res.data));
};
