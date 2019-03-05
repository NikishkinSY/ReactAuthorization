import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './components/navigation';
import { withCookies } from 'react-cookie';

function changeEmail(state = {}, action) {
  switch(action.type) {
    case 'CHANGE_EMAIL':
      return {...state, email: action.payload}
    case 'CHANGE_PASSWORD':
      return {...state, password: action.payload}
    default:
      return state;
  }
}

const store = createStore(changeEmail);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default withCookies(App);