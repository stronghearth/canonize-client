import React from 'react';
import ReactDom from 'react-dom';
import EditCharacterForm from './EditCharacterForm'


it('EditCharacterForm renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<EditCharacterForm />, div)
    ReactDom.unmountComponentAtNode(div)
})