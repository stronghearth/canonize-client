import React from 'react';
import ReactDOM from 'react-dom';
import UserCanonItem from './UserCanonItem'

it('Header renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UserCanonItem />, div)
    ReactDOM.unmountComponentAtNode(div)
});