import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './components/navigation';
import { withCookies } from 'react-cookie';
import config from 'react-global-configuration';

config.set({ 
  server: 'http://localhost:63433/'
});

function changeEmail(state = {}, action) {
  switch(action.type) {
    case 'CHANGE_EMAIL':
      return {...state, email: action.payload}
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