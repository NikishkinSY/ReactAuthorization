import {STORE__UPDATE_EMAIL} from './consts';

const initialState = {
  email: ''
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case STORE__UPDATE_EMAIL: {
      const email = action.payload.email;

      return {...state, email: email};
    }

    default:
      return state;
  }
}
