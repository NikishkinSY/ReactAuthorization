import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Navigation from '../navigation/index';
import { withCookies } from 'react-cookie';
import config from 'react-global-configuration';
import store from '../../store';

config.set({ 
  server: 'http://localhost:63433/'
});

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