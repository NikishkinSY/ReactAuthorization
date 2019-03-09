import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Confirmation from '../screens/confirmation';
import Private from '../screens/private';
import Public from '../screens/public';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import EmailInput from '../common/email';
import Navigation from '../common/navigation';

configure({ adapter: new Adapter() });

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders App without crashing', () => {
  shallow(<App />);
});

it('renders Confirmation without crashing', () => {
  shallow(<Confirmation />);
});

it('renders Private without crashing', () => {
  shallow(<Private />);
});

it('renders Public without crashing', () => {
  shallow(<Public />);
});

it('renders Signin without crashing', () => {
  shallow(<Signin />);
});

it('renders Signup without crashing', () => {
  shallow(<Signup />);
});

it('renders EmailInput without crashing', () => {
  shallow(<EmailInput />);
});

it('renders Navigation without crashing', () => {
  shallow(<Navigation />);
});