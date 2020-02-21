import React from 'react';
import ReactDOM from 'react-dom';
import UserExpandedItem from './UserExpandedItem';

it('Header renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UserExpandedItem />, div)
    ReactDOM.unmountComponentAtNode(div)
});