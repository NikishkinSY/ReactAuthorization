import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Navigation from '../navigation/index';
import { withCookies } from 'react-cookie';
import store from '../../store';

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