import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {CharacterProvider}  from '../../context/CharacterContext';
import {CanonProvider}  from '../../context/CanonContext';
import App from './App';

it('App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><CanonProvider><CharacterProvider><App /></CharacterProvider></CanonProvider></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});
