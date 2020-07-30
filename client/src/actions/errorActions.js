import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

//Return errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}