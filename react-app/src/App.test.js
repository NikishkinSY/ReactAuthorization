import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Confirmation from './components/confirmation';
import Private from './components/private';
import Public from './components/public';
import Signin from './components/signin';
import Signup from './components/signup';
import EmailInput from './components/email';
import Navigation from './components/navigation';

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