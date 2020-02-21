import React from 'react';
import ReactDom from 'react-dom';
import AddCharacterForm from './AddCharacterForm'


it('EditCharacterForm renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<AddCharacterForm />, div)
    ReactDom.unmountComponentAtNode(div)
})