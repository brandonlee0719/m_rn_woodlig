import axios from 'axios';
import { PROFILE_ACTIVITY_ALBUMS } from './reduxActions';
import { apiurl, localurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const profileAlbums = profile => dispatch => {
  axios
    .post(`${apiurl}fetch-user-profile-album.php`, profile)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: PROFILE_ACTIVITY_ALBUMS,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};
