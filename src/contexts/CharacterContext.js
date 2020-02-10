import React from 'react';


const CharacterContext = React.createContext({
    characters: [],
    error: null
})

export default CharacterContext