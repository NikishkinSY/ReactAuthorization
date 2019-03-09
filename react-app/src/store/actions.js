import {STORE__UPDATE_EMAIL} from './consts';

export const updateEmail = email => ({
  type: STORE__UPDATE_EMAIL,
  payload: {
    email: email || ''
  }
});