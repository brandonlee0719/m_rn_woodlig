import axios from 'axios';
import {
  INDIVIDUAL_ROLES,
  ROLE_TYPES,
  SELECTED_INDIVIDUAL_ROLES,
  SELECTED_BUSINESS_ROLES,
  DELETED_INDIVIDUAL_ROLE
} from './reduxActions';
import { apiurl } from '../../constants/config';

// eslint-disable-next-line import/prefer-default-export
export const rolesAction = () => dispatch => {
  axios
    .get(`${apiurl}fetch-individual-skills.php`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: INDIVIDUAL_ROLES,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};

export const rolesType = () => dispatch => {
  axios
    .get(`${apiurl}fetch-role-type.php`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ROLE_TYPES,
        payload: res.data
      });
    })
    .catch(res => console.log(res.data));
};

export const selectedIndividualRoles = roles => dispatch => {
  dispatch({
    type: SELECTED_INDIVIDUAL_ROLES,
    payload: roles
  });
};

export const deleteIndividualRoles = deleted => dispatch => {
  dispatch({
    type: DELETED_INDIVIDUAL_ROLE,
    payload: deleted
  });
};

export const selectedBusinessRoles = selected => dispatch => {
  dispatch({
    type: SELECTED_BUSINESS_ROLES,
    payload: selected
  });
};
